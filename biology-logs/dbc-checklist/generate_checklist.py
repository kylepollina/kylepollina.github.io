# Fermilab link
# https://www.fnal.gov/cgi-bin/ecology/wildlife/bigbar?Greater+White-fronted+Goose

import pandas as pd


html_start = """
<!-- template.html -->

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">

    <!-- CSS -->

    <link rel="stylesheet" href="https://kylepollina.github.io/styles.css">
    <!-- Fonts -->

    <title></title>
  </head>
  <body>
    <div id="container">
      <div id="posts">
        <div id="birds">
          <h1>DuPage Birding Club Visual Checklist</h1>
          View the checklist: <a href="https://dupagebirding.org/wp-content/uploads/2020/06/2020_DuPage_Checklist-Combined-3.pdf">DuPage Birding Club Checklist</a><br>
          Download the dataset: <a href="dbc_checklist.csv">Checklist download</a><br>
          <a href="https://kylepollina.github.io/wildlife/dbc-checklist/">Main page</a>
"""

html_end = """
        </div>
      </div>
    </div>
  </body>
</html>
"""


def build_page(bird_data: pd.DataFrame, output_file: str, all_bird_page: bool = False):
    """ Build the html page """
    html = html_start

    if all_bird_page:
        html = html.replace('../../https://kylepollina.github.io/styles.css', '../styles.css')

    else:
        season, abundance = output_file.split('/')
        abundance = abundance.replace('.html', '')

        html += f'<u><h1>{season}</h1></u>'

        for s in ['winter', 'early-spring', 'late-spring', 'summer', 'post-breeding', 'early-fall', 'late-fall']:
            html += "<a href='https://kylepollina.github.io/wildlife/dbc-checklist/{}/abundant.html'>".format(s)
            html += "{}</a>".format(s.replace('-', ' '))
            if s != 'late-fall':
                html += " - "

        html += "<u><h3>{}</h3></u>".format(abundance.replace('-', ' '))

        for abd in ['abundant', 'common', 'fairly-common', 'uncommon', 'rare', 'extremely-rare']:
            html += "<a href='https://kylepollina.github.io/wildlife/dbc-checklist/{}/{}.html'>".format(season, abd)
            html += "{}</a>".format(abd.replace('-', ' '))
            if abd != 'extremely-rare':
                html += " - "

    for bird, row in bird_data.iterrows():
        html += f"<h1>{bird}</h1>"

        if isinstance(row['img'], str):
            html += '<a href="{img}"><img src="{img}" loading="lazy"></a>'.format(img=row['img']) if isinstance(row['img'], str) else ''
        else:
            html += '<table width="100%">'
            html += '<col style="width:50%">'
            html += '<col style="width:50%">'
            html += '<thead>'
            html += '<tr>'
            html += '<th align="left">Female</th>'
            html += '<th align="left">Male</th>'
            html += '</tr>'
            html += '</thead>'
            html += '<tbody>'
            html += '<tr>'
            html += '<td align="left"><a href="{img}"><img alt="" src="{img}" loading="lazy"></a></td>'.format(img=row['female'])
            html += '<td align="left"><a href="{img}"><img alt="" src="{img}" loading="lazy"></a></td>'.format(img=row['male'])
            html += '</tr>'
            html += '</tbody>'
            html += '</table>'
            html += ''

        if not all_bird_page:
            html += row['recording_embed_link']

        else:
            html += "<table>"
            html += '<thead>'
            html += '<tr>'
            html += '<th align="left">Winter</th>' if isinstance(row['winter'], str) else ''
            html += '<th align="left">Early Spring</th>' if isinstance(row['early spring'], str) else ''
            html += '<th align="left">Late Spring</th>' if isinstance(row['late spring'], str) else ''
            html += '<th align="left">Summer</th>' if isinstance(row['summer'], str) else ''
            html += '<th align="left">Post Breeding</th>' if isinstance(row['post breeding'], str) else ''
            html += '<th align="left">Early Fall</th>' if isinstance(row['early fall'], str) else ''
            html += '<th align="left">Late Fall</th>' if isinstance(row['late fall'], str) else ''
            html += '</tr>'
            html += '<tbody>'
            html += '<tr>'
            html += '<td align="left">{}</td>'.format(row['winter'].split('- ')[-1]) if isinstance(row['winter'], str) else ''
            html += '<td align="left">{}</td>'.format(row['early spring'].split('- ')[-1]) if isinstance(row['early spring'], str) else ''
            html += '<td align="left">{}</td>'.format(row['late spring'].split('- ')[-1]) if isinstance(row['late spring'], str) else ''
            html += '<td align="left">{}</td>'.format(row['summer'].split('- ')[-1]) if isinstance(row['summer'], str) else ''
            html += '<td align="left">{}</td>'.format(row['post breeding'].split('- ')[-1]) if isinstance(row['post breeding'], str) else ''
            html += '<td align="left">{}</td>'.format(row['early fall'].split('- ')[-1]) if isinstance(row['early fall'], str) else ''
            html += '<td align="left">{}</td>'.format(row['late fall'].split('- ')[-1]) if isinstance(row['late fall'], str) else ''
            html += '</tr>'
            html += '</tbody>'
            html += '</thead>'
            html += '</thead>'
            html += "</table>"

        html += "<details><summary>More Information</summary>"
        html += "<ul>"
        
        if bird == 'Bald Eagle':
            html += "<li><a href='https://wizardpins.com/blogs/education/all-about-bald-eagles'> All About Bald Eagles!</a> <br>(Suggested by Chelsea, Sarah, Jarod, and Erin. Thank you!!) </li>"
        
        html += "<li><a href='{}'> eBird - {}</a></li>".format(row['ebird'], bird)
        html += "<li><a href='{}'> Wikipedia - {}</a></li>".format(row['wikipedia'], bird)
        html += "<li><a href='{}'>All About Birds - {}</a></li>".format(row['allaboutbirds'], bird)
        html += "<ul><li><a href='{}'>ID Info</a></li>".format(row['allaboutbirds'].replace('/overview', '/id'))
        html += "<li><a href='{}'>Life History</a></li>".format(row['allaboutbirds'].replace('/overview', '/lifehistory'))
        html += "<li><a href='{}'>Range Maps</a></li>".format(row['allaboutbirds'].replace('/overview', '/maps-range'))
        html += "<li><a href='{}'>Recordings</a></li>".format(row['allaboutbirds'].replace('/overview', '/sounds'))
        html += "</ul></ul>"
        html += "<h2>Range Map</h2>"
        html += '<a href="{}"><img src="{}" style="width: 75%" loading="lazy"></a>'.format(row['allaboutbirds'].replace('/overview', '/maps-range'), row['migration'])
        html += "<h2>Fermilab Sighting Chart</h2>"
        html += '<a href="https://www.fnal.gov/cgi-bin/ecology/wildlife/display?{formatted_name}"><img src="https://www.fnal.gov/cgi-bin/ecology/wildlife/bigbar?{formatted_name}" loading="lazy"></a>'.format(
            formatted_name=bird.replace(' ', '+')
        )
        html += "</details>"

        html += "<hr>"

    html += html_end

    with open(output_file, 'w+') as f:
        f.write(html)


if __name__ == "__main__":
    df = pd.read_csv('bird_data.csv', index_col='bird')

    for season in ['winter', 'early spring', 'late spring', 'summer', 'post breeding', 'early fall', 'late fall']:
        winter_birds = df.dropna(subset=[season])  # Only drop NA rows in the current season
        build_page(winter_birds[winter_birds[season] == '1 - abundant'], '{}/abundant.html'.format(season.replace(' ', '-')))
        build_page(winter_birds[winter_birds[season] == '2 - common'], '{}/common.html'.format(season.replace(' ', '-')))
        build_page(winter_birds[winter_birds[season] == '3 - fairly common'], '{}/fairly-common.html'.format(season.replace(' ', '-')))
        build_page(winter_birds[winter_birds[season] == '4 - uncommon'], '{}/uncommon.html'.format(season.replace(' ', '-')))
        build_page(winter_birds[winter_birds[season] == '5 - rare'], '{}/rare.html'.format(season.replace(' ', '-')))
        build_page(winter_birds[winter_birds[season] == '6 - extremely rare'], '{}/extremely-rare.html'.format(season.replace(' ', '-')))

    build_page(df, 'all.html', all_bird_page=True)
