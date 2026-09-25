const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: '/usr/bin/google-chrome-stable',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ],
        headless: true
    }
});

client.on('qr', (qr) => {
    console.log(' පහත QR Code එක WhatsApp එකෙන් Scan කරන්න:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log(' WhatsApp Bot සාර්ථකව සක්‍රිය විය!');
});

client.on('message', async (msg) => {
    const text = msg.body ? msg.body.trim() : '';
    const lowerText = text.toLowerCase();

    if (msg.hasMedia && msg.type === 'image') {
        await msg.reply(' ඔබ එවූ පින්තූරය සාර්ථකව ලැබුණි!');
        return;
    }

    if (lowerText.startsWith('hi ')) {
        const nameInput = text.substring(3).trim();
        if (nameInput.length > 0) {
            const formattedName = nameInput.charAt(0).toUpperCase() + nameInput.slice(1);
            const replyMessage = `Hi  Name: ${formattedName}\n   Town : Kurunegala \n\n Oyage visthara danna \n  save karaganna`;
            await msg.reply(replyMessage);
        }
    }
    else if (lowerText === 'hi' || lowerText === 'hello' || lowerText === 'hey') {
        const defaultReply = `ආයුබෝවන්! 🌟
මා හා සම්බන්ධ වූවාට ස්තූතියි. ඔබට මාගෙන් සිදුවිය යුත්තේ කුමක්දැයි සටහන් තබන්න. මම හැකි ඉක්මනින් ඔබට පිළිතුරු ලබා දෙන්නෙමි. සුබ දවසක්!

---

Hello! 🌟
Thank you for reaching out. Please let me know how I can help you, and I will get back to you as soon as possible. Have a great day!

My telegram link : https://t.me/dilshan7878`;
        
        await msg.reply(defaultReply);
    }
});

client.on('message', async (msg) => {
    if (msg.from === 'status@broadcast') {
        try {
            await msg.read();
            console.log(` Status එකක් නරඹන ලදී: ${msg.author || msg.from}`);
        } catch (err) {
            console.error('Error viewing status:', err);
        }
    }
});

client.initialize();
