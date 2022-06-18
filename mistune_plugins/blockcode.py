# Taken from https://github.com/AlanDecode/Maverick/blob/master/Maverick/mistune_plugins/blockcode.py
# License: https://github.com/AlanDecode/Maverick/blob/master/LICENSE
# Author: AlanDecode

import mistune
from pygments import highlight
from pygments.styles import get_style_by_name
from pygments.lexers import get_lexer_by_name
from pygments.formatters import html

style = get_style_by_name('material')


class HighlightRenderer(mistune.HTMLRenderer):

    def fallback(self, code, lang=None):
        return '\n<pre><code>%s</code></pre>\n' % mistune.escape(code)

    def block_code(self, code, lang=None):
        if lang:
            # return super().block_code(code, lang)
            try:
                lexer = get_lexer_by_name(lang, stripall=True)
                # formatter = html.HtmlFormatter(style=style, linenos=True)
                formatter = html.HtmlFormatter(linenos=True, wrapcode=True, cssfile='code.css', style=style)
                return highlight(code, lexer, formatter)
                # style_defs = formatter.get_style_defs('td .code')
                # return '<style>' + style_defs + '</style>' + highlight(code, lexer, formatter)
            except Exception:
                return self.fallback(code, lang)
        else:
            return self.fallback(code, lang)
