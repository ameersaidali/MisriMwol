/* Copyright (C) 2020 Yusuf Usta.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
WhatsAsena - Yusuf Usta
*/

const Asena = require('../events');
const config = require('../config');
const Heroku = require('heroku-client');
const heroku = new Heroku({
    token: config.HEROKU.API_KEY
});
let baseURI = '/apps/' + config.HEROKU.APP_NAME;

   var l_dsc = ''
    var alr_on = ''
    var alr_off = ''
    var THERI_on = ''
    var THERI_off = ''
   
    if (config.LANG == 'EN') {
        l_dsc = 'eni link ittalum cheetha vilichalum nee purath. -bot owner command'
        alr_on = 'Antilink is already open!'
        alr_off = 'Antilink is currently closed!'
        THERI_on = '*eni whatsapp group link ittal kick cheyyum*'
        THERI_off = '*eni enth theri vennelum vili*'
    }
   
    if (config.LANG == 'HI') {
        l_dsc = 'एंटीलिंक टूल को सक्रिय करता है।'
        alr_on = 'एंटीलिंक पहले से ही खुला है!'
        alr_off = 'एंटीलिंक वर्तमान में बंद है!'
        THERI_on = 'bgm option turndा!'
        THERI_off = 'bgm option turned off'
    }
    if (config.LANG == 'ML') {
        l_dsc = 'ലിങ്ക് ഇട്ടാൽ റിമോവ് .'
        alr_on = 'ആന്റിലിങ്ക് ഇതിനകം തുറന്നു!'
        alr_off = 'ആന്റിലിങ്ക് നിലവിൽ അടച്ചിരിക്കുന്നു!'
        THERI_on = 'ലിങ്ക് ഇട്ടാലും ചീത്ത വിളിച്ചാലും ഇനി റിമോവ് ആക്കും '
        THERI_off = 'ന്തു കാണിച്ചാലും ഞാൻ മൈന്റ് ചെയ്യില്ല '
    }
   
    Asena.addCommand({pattern: 'link ?(.*)', fromMe: true, desc: l_dsc, usage: '.link no / yes' }, (async (message, match) => {
        if (match[1] == 'yes') {
                await heroku.patch(baseURI + '/config-vars', { 
                    body: { 
                        ['THERI_KICK']: 'false'
                    } 
                });
                await message.sendMessage(THERI_off)
        } else if (match[1] == 'no') {
                await heroku.patch(baseURI + '/config-vars', { 
                    body: { 
                        ['THERI_KICK']: 'true'
                    } 
                });
                await message.sendMessage(THERI_on)
        }
    }));
