// Excercise 3


$(document).ready(function() {
    // Fade in H1
    $('#button').click(function() {
        $('h1').fadeIn();
    });

    // Fade out H1
    $('#button2').click(function() {
        $('h1').fadeOut();
    });

    // Slide up main content (kaikki <p>-elementit)
    $('#button3').click(function() {
        $('p').slideUp();
    });

    // Slide down main content
    $('#button4').click(function() {
        $('p').slideDown();
    });

    // Custom animation
    $('#animateButton').click(function() {
        $('#animateImg').animate({
            left: '+=100px', // Siirretään kuvaa oikealle 100px
            opacity: 0.5    // Muutetaan läpinäkyväksi
        }, 1000, function() {
            // Animaation jälkeen palautetaan alkuperäiset arvot
            $(this).animate({
                left: '-=100px',
                opacity: 1
            }, 1000);
        });
    });
});



// Excercise 4

$(document).ready(function() {
    // Lataa sisältö suoraan Ajaxilla
    $('#mySelect').change(function() {
        const value = $(this).val();
        let url = '';

        // Valitaan URL käyttäjän valinnan perusteella
        if (value === 'first') {
            url = 'https://meijastiina.github.io/news_rss_topstories.xml'; // RSS-syöte
        } else if (value === 'second') {
            url = 'https://jsonplaceholder.typicode.com/posts/1'; // JSON-placeholder
        } else if (value === 'third') {
            url = 'https://jsonplaceholder.typicode.com/posts/2'; // JSON-placeholder
        }

        // Ajax-pyyntö URL:lle
        if (url) {
            $('#ajax').text('Loading...'); // Näytetään latausviesti
            $.ajax({
                url: url,
                dataType: (url === 'https://meijastiina.github.io/news_rss_topstories.xml') ? 'xml' : 'json',
                success: function(data) {
                    // Tarkistetaan onko data XML vai JSON
                    if (url === 'https://meijastiina.github.io/news_rss_topstories.xml') {
                        
                        let items = $(data).find('item');
                        let content = '<ul>';
                        items.each(function() {
                            let title = $(this).find('title').text();
                            let link = $(this).find('link').text();
                            content += `<li><a href="${link}" target="_blank">${title}</a></li>`;
                        });
                        content += '</ul>';
                        $('#ajax').html(content);
                    } else {
                        // Jos data on JSON, näytetään raakadata
                        $('#ajax').text(JSON.stringify(data, null, 2));
                    }
                },
                error: function() {
                    $('#ajax').text('Failed to load data.');
                }
            });
        }
    });
});

