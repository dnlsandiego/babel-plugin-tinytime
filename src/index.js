export default function(babel) {
    const { types: t } = babel;

    const hoistTinytimeInvocation = {
        CallExpression(path) {
            if (path.node.callee.name !== this.tinytimeImportName) return;

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

                const tinytimeImportName = path.node.specifiers.find(
                    specifier => specifier.type === 'ImportDefaultSpecifier'
                ).local.name;
                const program = path.find(parent => parent.isProgram());

                program.traverse(hoistTinytimeInvocation, {
                    tinytimeImportName,
                    program
                });
            }
        }
    };
}
