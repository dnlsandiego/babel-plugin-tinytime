export default function(babel) {
    const { types: t } = babel;

    let tinytimeImportName;

    return {
        name: 'tinytime-ast-transform', // not required
        visitor: {
            ImportDeclaration(path) {
                if (path.node.source.value !== 'tinytime') return;

                tinytimeImportName = path.node.specifiers[0].local.name;
            },
            CallExpression(path) {
                if (path.node.callee.name !== tinytimeImportName) return;

                const program = path.find(parent => parent.isProgram());
                const templateDeclarationVarName = program.scope.generateUidIdentifier(
                    'template'
                );
                const templateDeclaration = t.variableDeclaration('var', [
                    t.variableDeclarator(templateDeclarationVarName, path.node)
                ]);

                program.node.body.unshift(templateDeclaration);
                path.replaceWith(t.identifier(templateDeclarationName.name));
            }
        }
    };
}
