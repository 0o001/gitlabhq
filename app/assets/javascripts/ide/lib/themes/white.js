const BOLD = 'bold';
const ITALIC = 'italic';
const BOLD_ITALIC = 'bold italic';
const UNDERLINE = 'underline';

export default {
  base: 'vs',
  inherit: false,
  rules: [
    // Standard theme defaults and overrides based on VS theme
    // https://github.com/Microsoft/vscode/blob/master/src/vs/editor/standalone/common/themes.ts
    // License: MIT (https://github.com/microsoft/vscode/blob/master/LICENSE.txt)
    { token: '', foreground: '2e2e2e', background: 'ffffff' },
    { token: 'keyword.css', fontStyle: BOLD, foreground: '999999' },
    { token: 'keyword.less', fontStyle: BOLD, foreground: '999999' },
    { token: 'keyword.scss', fontStyle: BOLD, foreground: '999999' },
    { token: 'keyword.md', fontStyle: BOLD, foreground: '800080' },

    { token: 'variable', foreground: '008080' },
    { token: 'variable.md', foreground: 'dd1144' },
    { token: 'variable.predefined', foreground: '008080' },
    { token: 'number', foreground: '009999' },
    { token: 'number.hex', foreground: '3030c0' },

    { token: 'type.identifier.ts', foreground: '445588', fontStyle: BOLD },
    { token: 'type.identifier.swift', foreground: '445588', fontStyle: BOLD },
    { token: 'type.identifier.kt', foreground: '445588', fontStyle: BOLD },
    { token: 'type.identifier.perl', foreground: '2e2e2e', fontStyle: BOLD },

    { token: 'tag', foreground: '000080' },
    { token: 'tag.class', foreground: '445588', fontStyle: BOLD },
    { token: 'tag.css', foreground: '445588', fontStyle: BOLD },
    { token: 'tag.less', foreground: '445588', fontStyle: BOLD },
    { token: 'tag.scss', foreground: '445588', fontStyle: BOLD },
    { token: 'tag.id.jade', foreground: '445588' },
    { token: 'tag.class.jade', foreground: '445588' },
    { token: 'meta.scss', foreground: '800000' },
    { token: 'metatag', foreground: 'e00000' },
    { token: 'metatag.content.html', foreground: 'e00000' },
    { token: 'metatag.html', foreground: '808080' },
    { token: 'metatag.xml', foreground: '808080' },
    { token: 'metatag.php', fontStyle: BOLD },

    { token: 'key', foreground: '863b00' },
    { token: 'key.ini', foreground: '008080' },
    { token: 'string.key.json', foreground: '2e2e2e' },
    { token: 'string.value.json', foreground: 'dd1144' },
    { token: 'string.link.md', foreground: 'aa0000' },

    { token: 'attribute.name', foreground: '008080' },
    { token: 'attribute.name.css', foreground: '2e2e2e' },
    { token: 'attribute.name.json', foreground: '2e2e2e' },
    { token: 'attribute.name.scss', foreground: '2e2e2e' },
    { token: 'attribute.name.less', foreground: '2e2e2e' },
    { token: 'attribute.value', foreground: 'dd1144' },
    { token: 'attribute.value.css', foreground: '0086b3' },
    { token: 'attribute.value.hex', foreground: '0086b3' },
    { token: 'attribute.value.number', foreground: '009999' },
    { token: 'attribute.value.unit', foreground: '009999' },
    { token: 'attribute.value.xml', foreground: 'dd1144' },
    { token: 'attribute.value.html', foreground: 'dd1144' },
    { token: 'attribute.value.md', foreground: 'aa0000' },

    { token: 'string', foreground: 'dd1144' },
    { token: 'string.target', foreground: 'aa0000' },
    { token: 'string.sql', foreground: 'dd1144' },

    { token: 'keyword.flow', foreground: '2e2e2e', fontStyle: BOLD },
    { token: 'keyword.st', foreground: '445588', fontStyle: BOLD },
    { token: 'variable.st', foreground: '445588', fontStyle: BOLD },
    { token: 'type.st', foreground: '445588', fontStyle: BOLD },

    { token: 'operator.scss', foreground: '666666' },
    { token: 'operator.sql', foreground: '2e2e2e', fontStyle: BOLD },
    { token: 'operator.swift', foreground: '666666' },
    { token: 'predefined.sql', foreground: '2e2e2e', fontStyle: BOLD },

    // GitHub theme based on https://github.com/brijeshb42/monaco-themes/blob/master/themes/GitHub.json
    // Customized for Web IDE
    // License: MIT (https://github.com/brijeshb42/monaco-themes/blob/master/LICENSE)
    { token: 'comment', foreground: '999988', fontStyle: ITALIC },
    { token: 'comment.block.preprocessor', foreground: '999999', fontStyle: BOLD },
    { token: 'comment.documentation', foreground: '999999', fontStyle: BOLD_ITALIC },
    { token: 'comment.block.documentation', foreground: '999999', fontStyle: BOLD_ITALIC },
    { token: 'invalid.illegal', foreground: 'aa0000', background: 'e3d2d2' },
    { token: 'keyword', fontStyle: BOLD, foreground: '2e2e2e' },
    { token: 'storage', fontStyle: BOLD },
    { token: 'keyword.operator', fontStyle: BOLD },
    { token: 'constant.language', fontStyle: BOLD },
    { token: 'support.constant', fontStyle: BOLD },
    { token: 'storage.type', foreground: '445588', fontStyle: BOLD },
    { token: 'support.type', foreground: '445588', fontStyle: BOLD },
    { token: 'entity.other.attribute-name', foreground: '008080' },
    { token: 'variable.other', foreground: '0086b3' },
    { token: 'variable.language', foreground: '999999' },
    { token: 'entity.name.type', foreground: '445588', fontStyle: BOLD },
    { token: 'entity.other.inherited-class', foreground: '445588', fontStyle: BOLD },
    { token: 'support.class', foreground: '445588', fontStyle: BOLD },
    { token: 'variable.other.constant', foreground: '008080' },
    { token: 'constant.character.entity', foreground: '800080' },
    { token: 'entity.name.exception', foreground: 'aa0000' },
    { token: 'entity.name.function', foreground: 'aa0000' },
    { token: 'support.function', foreground: 'aa0000' },
    { token: 'keyword.other.name-of-parameter', foreground: 'aa0000' },
    { token: 'entity.name.section', foreground: '666666' },
    { token: 'entity.name.tag', foreground: '000080' },
    { token: 'variable.parameter', foreground: '008080' },
    { token: 'support.variable', foreground: '008080' },
    { token: 'constant.numeric', foreground: '009999' },
    { token: 'constant.other', foreground: '009999' },
    { token: 'constant.character', foreground: 'dd1144' },
    { token: 'string.regexp', foreground: '009926' },
    { token: 'constant.other.symbol', foreground: '990073' },
    { token: 'punctuation', fontStyle: BOLD },
    { token: 'markup.deleted', foreground: '000000', background: 'ffdddd' },
    { token: 'markup.italic', fontStyle: ITALIC },
    { token: 'markup.error', foreground: 'aa0000' },
    { token: 'markup.heading.1', foreground: '999999' },
    { token: 'markup.inserted', foreground: '000000', background: 'ddffdd' },
    { token: 'markup.output', foreground: '808080' },
    { token: 'markup.raw', foreground: '808080' },
    { token: 'markup.prompt', foreground: '666666' },
    { token: 'markup.bold', fontStyle: BOLD },
    { token: 'markup.heading', foreground: '999999' },
    { token: 'markup.traceback', foreground: 'aa0000' },
    { token: 'markup.underline', fontStyle: UNDERLINE },
    { token: 'meta.diff.range', foreground: '999999', background: 'eaf2f5' },
    { token: 'meta.diff.index', foreground: '999999', background: 'eaf2f5' },
    { token: 'meta.separator', foreground: '999999', background: 'eaf2f5' },
    { token: 'meta.diff.header.from-file', foreground: '999999', background: 'ffdddd' },
    { token: 'meta.diff.header.to-file', foreground: '999999', background: 'ddffdd' },
    { token: 'meta.link', foreground: '4183c4' },
  ],
  colors: {
    'editor.foreground': '#2e2e2e',
    'editor.selectionBackground': '#aad6f8',
    'editor.lineHighlightBackground': '#fffeeb',
    'editorCursor.foreground': '#666666',
    'editorWhitespace.foreground': '#bbbbbb',

    'editorLineNumber.foreground': '#cccccc',
    'diffEditor.insertedTextBackground': '#a0f5b420',
    'diffEditor.removedTextBackground': '#f9d7dc20',
    'editorIndentGuide.activeBackground': '#cccccc',
    'editorSuggestWidget.focusHighlightForeground': '#96D8FD',
  },
};
