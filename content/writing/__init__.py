
from pathlib import Path
from textwrap import dedent
import frontmatter
import dateparser

HERE = Path(__file__).parent


def build():
    md_files = list(Path(HERE).rglob('*.md'))
    index_page_content = dedent(
        """
        ---
        title: writing
        page: writing
        ---

        ## writing
        """
    )

    # list for storing each page link + date content so that we can sort by published date after extracting everything
    pages = []

    for md_file in md_files:
        with open(md_file, 'r') as f:
            fm = frontmatter.load(f)

        if fm.get('published') is True:
            date = dateparser.parse(fm['date']).strftime("%b %d %Y") if 'date' in fm else None
            display = f"- [{fm['title']}]"
            link = f"({md_file.relative_to(HERE).with_suffix('.html')})"
            pages.append(
                {
                    'date': date,
                    'line': f"{display}{link}"
                }
            )

    pages = sorted(pages, key=lambda page_info: (page_info['date'], None))
    index_page_content += "\n".join(
        [f"{page['line']} {page['date']}" for page in pages]
    )

    with open(HERE / 'index.md', 'w+') as f:
        f.write(index_page_content)
