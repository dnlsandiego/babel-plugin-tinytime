export default function(babel) {
    const { types: t } = babel;

    const hoistTinytimeInvocation = {
        CallExpression(path) {
            if (path.node.callee.name !== this.tinytimeImportName) return;
            // Don't transform when the template obj is already being assigned into a variable.
            // e.g. `const template = tinytime('{h}:{mm}:{ss}{a}')`
            if (path.container.type === 'VariableDeclarator') return;
            // Don't transform when tinytime is invoked globally.
            if (path.scope.block.type === 'Program') return;

            const templateDeclarationVarName = this.program.scope.generateUidIdentifier(
                'template'
            );
            const templateDeclaration = t.variableDeclaration('var', [
                t.variableDeclarator(templateDeclarationVarName, path.node)
            ]);

            this.program.node.body.unshift(templateDeclaration);

            path.replaceWith(t.identifier(templateDeclarationVarName.name));
        }
    };

    return {
        name: 'tinytime-ast-transform',
        visitor: {
            ImportDeclaration(path) {
                if (path.node.source.value !== 'tinytime') return;

                const program = path.find(parent => parent.isProgram());
                const tinytimeImportName = path.node.specifiers.find(
                    ({ type }) => type === 'ImportDefaultSpecifier'
                ).local.name;

                program.traverse(hoistTinytimeInvocation, {
                    tinytimeImportName,
                    program
                });
            }
        }
    };
}
