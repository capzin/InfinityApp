var File;
var themes;
var eventEmitter;

try {
    File = require(path.resolve(process.cwd(), './File.js'));
    themes = require(path.resolve(process.cwd(), './theme.js'));
    eventEmitter = require(path.resolve(process.cwd(), './events.js')).eventEmitter;
} catch (err) {
    File = require(path.resolve(process.cwd(), './resources/app/File.js'));
    themes = require(path.resolve(process.cwd(), './resources/app/theme.js'));
    eventEmitter = require(path.resolve(process.cwd(), './resources/app/events.js')).eventEmitter;
}

function checkTheme() {
    File.ReadFile('options.json', db => {
        var data = JSON.parse(db);

        if (data.themeCookie.length <= 0) {
            console.log('Adicionando temas');
            data.themeCookie = themes.datathemes;
        }
        var themeCookie = data.themeCookie;

        // refreshtheme();

        themeCookie.forEach((themedata) => {
            themes.themes.forEach((theme) => {
                var name = theme.name;

                if (themedata[name] == true) {
                    $("head").append(`<link rel="stylesheet" id="${name}" href="${theme.css}">`);
                    $(`#${theme.author}-${theme.name}`).attr('data-check', 'true');
                    $(`#${theme.author}-${theme.name}`).attr('checked', '');
                    $(`#${theme.author}-${theme.name}`).attr('active', '');
                } else if (themedata[name] == false) {
                    $(`#${name}`).remove();
                    $(`#${theme.author}-${theme.name}`).attr('data-check', 'false');
                    $(`#${theme.author}-${theme.name}`).removeAttr('checked', '');
                    $(`#${theme.author}-${theme.name}`).removeAttr('active', '');
                }
            });
        });

        File.SaveFile('options.json', JSON.stringify(data));
    });
}

function refreshtheme() {
    $('#theme-box').children().remove();
    themes.themes.forEach((theme) => {
        $('#theme-box').append(`
        <div class="contain-theme">
            <div class="lost-tab-top">
                <div class="contain-tab">
                    <span class="tab-title">${theme.name}</span>
                    <div class="lost-more-info">
                        <span class="more-title-info">Autor:</span>
                        <span class="more-info">${theme.author}</span>
                        <span class="more-title-info">Versão:</span>
                        <span class="more-info">${theme.version}</span>
                    </div>
                </div>
                <div class="switch" theme>
                    <div class="cmn-toggle cmn-toggle-round" data-theme-name="${theme.name}" data-author-name="${theme.author}" data-check="false" id="${theme.author}-${theme.name}"></div>
                    <label></label>
                </div>
            </div>
            <div class="lost-tab-bottom">
                <span class="tab-description">${theme.description}</span>
            </div>
        </div>
        `);
    });
}

setTimeout(() => {
    checkTheme();
}, 1000);

eventEmitter.on('checkTheme', checkTheme);