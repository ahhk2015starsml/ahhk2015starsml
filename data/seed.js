// See http://docs.clusterpoint.com/examples/
var cps = require('cps-api');

// heroku config:set TIMES=2
// process.env.TIMES

// Creating a CPS connection
var cpsConn = new cps.Connection(
    'tcp://cloud-us-0.clusterpoint.com:9007',
    'ahhk2015starsml',
    "ahhkuser", //process.env.CPS_USERNAME,
    "ahhkpass", //process.env.CPS_PASSWORD,
    'document',
    'document/id',
    {account: 100586});

// Debug
cpsConn.debug = true;

{
    var quiz = {
        questions: [
            "You find it easy to introduce yourself to other people.",
            "You often get so lost in thoughts that you ignore or forget your surroundings.",
            "You try to respond to your e-mails as soon as possible and cannot stand a messy inbox.",
            "You find it easy to stay relaxed and focused even when there is some pressure.",
            "You don’t usually initiate conversations.",
            "You feel a constant need for something new.",
            "You have numerous and varied interests rather than several specific ones",
            "Being adaptable is more important to you than being organized.",
            "Solving practical problems interests you more than finding answers to existential questions.",
            "Winning a debate is more important to you than making sure no one gets upset.",
            "You often feel as if you have to justify yourself to other people.",
            "Your home and work environments are quite tidy.",
            "You do not mind being at the center of attention.",
            "You would rather call yourself pragmatic than visionary.",
            "You rarely get mood swings.",
            "Your travel plans are usually well thought out.",
            "It is often difficult for you to relate to other people’s feelings.",
            "Your mood can change very quickly.",
            "In a discussion, truth should be more important than people’s sensitivities",
            "You rarely worry about how your actions affect other people.",
            "Your work style is closer to random energy spikes than to a methodical and organized approach.",
            "You are often envious of others.",
            "An interesting book or a video game is often better than a social event.",
            "Being able to develop a plan and stick to it is the most important part of every project.",
            "You can easily lose yourself in fantasy and ideas.",
            "Others would call you ingenious as you are constantly generating original ideas.",
            "If someone does not respond to your e-mail quickly, you start worrying if you said something wrong.",
            "As a parent, you would rather see your child grow up kind than smart.",
            "You do not mind tasks that involve a lot of routine."
        ],
        weights: [
            [1, 0, 0, 0, 1],
            [0, 1, 1, 0, 0],
            [0, 1, 0, 0, 1],
            [0, 1, 1, 0, 1],
            [1, 0, 0, 0, 0],
            [1, 0, 1, 0, 0],
            [0, 1, 1, 0, 1],
            [0, 0, 0, 1, 1],
            [1, 0, 0, 1, 0],
            [0, 0, 1, 0, 1],
            [1, 0, 1, 1, 0],
            [0, 1, 1, 0, 0],
            [1, 0, 1, 0, 0],
            [0, 0, 0, 1, 1],
            [0, 0, 1, 0, 1],
            [0, 1, 1, 0, 0],
            [1, 0, 1, 1, 0],
            [0, 0, 1, 0, 1],
            [0, 0, 0, 1, 1],
            [1, 0, 1, 1, 0],
            [0, 1, 0, 0, 1],
            [0, 1, 1, 1, 0],
            [1, 0, 1, 0, 0],
            [0, 0, 1, 1, 0],
            [0, 1, 1, 0, 0],
            [0, 1, 0, 1, 0],
            [0, 0, 1, 0, 1],
            [1, 1, 1, 0, 0],
            [1, 0, 1, 0, 0]
        ]
    }

    var documents = [];
    for (var i = 0; i < quiz.questions.length; ++i) {
        documents.push({
            id: "quizId-" + i,
            text: quiz.questions[i],
            weights: quiz.weights[i]
        });
    }
    cpsConn.sendRequest(new cps.InsertRequest(documents), function (err, resp) {
        if (err) {
            return console.error(err);
        } // Handle error
    });
}

{
    var horoscope = {
        text: [
            "Your mind is so active that good ideas are flowing thick and fast. Wherever you are and whatever you may be doing you should keep a pen and some paper close by at all times. Put your thoughts into words the moment they come to you.",
            "Try to get out and about today. You won't be very happy if you're cooped up in one place for too long, or if you're doing something rather boring. You need plenty of variety and action, otherwise you'll lose interest in whatever you're doing. Travel could appeal to you, too, whether it's the thought of a big holiday or a weekend away.",
            "You're in the mood to spend! Maybe you've recently been given some extra cash and now you can't wait to do something exciting with it. Any sort of shopping will get your adrenalin flowing, and it may also lead to you buying much more than you intended. So a trip to the supermarket could turn out to be a major expedition in which you appear to be preparing for a siege.",
            "You have a lot of energy and enthusiasm today, and can make things happen. It's a great opportunity to organize something that you can look forward to, such as a forthcoming social event or a group gathering. You'll swing into action with no trouble at all, and if you need to rope in some helpers you'll take that in your stride as well.",
            "There's no danger of you getting the blues today because you're in such a dynamic and go-ahead mood. Keen to get moving and make things happen? Don't hang around waiting for other people to wake up; decide to take action yourself. As a result you might prefer to work by yourself and at your own pace when you get the chance.",
            "You're in a go-getting mood today, so you're reluctant to sit around wasting time. You'll function at your best if you can get yourself organized in advance, otherwise you could start to get frustrated. Do your best to keep on the move so you can burn up your excess energy in positive and constructive ways. It's a brilliant day for planning a journey, too.",
            "It's difficult to cope with a certain person today because they're in such a disruptive and contrary mood. This won't last, thankfully, but it will test your patience in the meantime, putting you on edge. It won't help if you're cooped up in one place for too long, either, so try to have changes of scene and to introduce some variety into your day.",
            "You're showing no signs of feeling fed up or living in a dream world. Instead, you're bouncing around and feeling full of beans, which is a great way to get started. No matter what you've planned today, try to fit in something sociable, even if it's a quick chat with a neighbor or a hasty sandwich with a friend.",
            "This is a super day for burning off lots of nervous energy, especially if you're still feeling frazzled after what happened yesterday. Go for a brisk walk, get your money's worth out of the gym, or whack the living daylights out of some tennis balls to get you in the mood for watching Wimbledon. You'll also have bags of energy when tackling mundane chores. What a good day!",
            "You're in the mood for some fun and enjoyment today and nothing less will do. You certainly won't want to hang around anyone who doesn't know how to enjoy themselves, so try to give them a miss and go for some real live wires instead. If you're single you might meet someone who really gets your adrenalin flowing. Well, what are you going to do about it?",
            "You'll be happiest when you're kept busy today, although it has to be to be on your own terms, rather than as a result of someone else's orders. You'll also be perfectly content if you can potter about in your home or garden, by yourself and tackling the chores in your own sweet time. If you're currently looking for a new home, have another look at your wish list of how you want it to be.",
            "Your spirits start to rise again today, much to your relief and you'll soon wonder what all the fuss was about yesterday. You're in the mood to have some fun, preferably with people who are on the same wavelength as you. You'll also enjoy immersing yourself in a favourite hobby or leisure pursuit, and feeling your worries melt away as you relax.",
            "You're feeling rather rebellious today, especially if someone wants you to play by their rules because you're simply not prepared to do that. You may even feel that hell will have to freeze over before you obey this person, which may be a slight over-reaction on your part and certainly won't help the situation. Try not to stir up trouble simply because you want to see what will happen next.",
            "As the sun moves into the area of your chart that governs travel plans and social activities tomorrow the only effort you have to make today is to lighten up. You have been far too serious in recent weeks. It’s time to smile more.",
            "You need to start thinking seriously about your cash-flow situation. The sun’s entry into the money area of your chart tomorrow means you can and you must face up to financial reality – and that means earning more and spending less.",
            "The sun enters your birth sign tomorrow and a new solar year gets under way. You may not notice much of a difference to start with but by the middle of next week your confidence will be back and you will be looking forward with real excitement.",
            "You will be attracted to things, and people, that are out of the ordinary over the next 48 hours. You could even find yourself infatuated by something, or someone, you never noticed before. It may not last but it will be fun.",
            "Where before you were working by and for yourself you must now join forces with like-minded people and work towards goals that have a wider social importance. Can you make the world a better place? You can if you try.",
            "The sun’s entry into the career area of your chart this weekend will give both your energy and your ambition a boost. Decide what it is you most wish to achieve, focus on it to the exclusion of everything else, then make it happen.",
            "Are you open to new ideas? Hopefully you are because the planets suggest that if you try something new over the next few weeks you will be surprised by how much you enjoy it. It does not have to be a threat to what you already believe.",
            "The sun moves into one of the more sensitive areas of your chart this weekend, challenging you to think deeply about where you are going, what you are doing and what it all means. Everything is big about Sagittarius – even the questions.",
            "Don’t try to force others to follow your lead because over the next few weeks it is you who is going to be doing most of the following. You can still get your way in some things but you must be subtle about it. Persuade, don’t pressurize.",
            "Keep things simple this weekend. If you allow yourself to get bogged down in details you will lose sight of what it is you are trying to achieve and waste time and energy trying to get back on course again. Simplicity equals success.",
            "After the trials and tribulations of recent weeks a more lighthearted phase begins this weekend and you have every right to go out and celebrate. But don’t bounce from one extreme to the other and start acting outrageously every chance you get!",
        ],
        weights: [
            [-3, 1, -1, -2, 0],
            [2, 3, -3, 0, 3],
            [-3, 3, 0, 1, 2],
            [2, 3, -3, -2, 3],
            [-2, 3, 1, 0, 2],
            [1, -2, -1, 3, 0],
            [1, 3, -3, 2, 0],
            [3, 2, 0, 0, 3],
            [1, 3, -2, 2, 3],
            [-2, -1, -3, -1, 0],
            [-3, 3, -2, 0, 0],
            [2, 1, 3, 0, 0],
            [2, 3, -3, -1, 3],
            [2, -3, -2, 0, 2],
            [1, -2, -3, 3, -2],
            [-1, -3, -2, 2, 3],
            [1, -3, 3, -2, 2],
            [-1, 2, 3, -3, -2],
            [-3, 1, 3, 2, -2],
            [-1, 1, -2, 3, 2],
            [-1, 2, 3, -3, -2],
            [1, 2, 3, -2, -3],
            [-1, 1, 2, -2, 3],
            [3, -3, 0, 2, -1]
        ],
        signs: [
            "ARIES",
            "TAURUS",
            "GEMINI",
            "CANCER",
            "LEO",
            "VIRGO",
            "LIBRA",
            "SCORPIO",
            "SAGITTARIUS",
            "CAPRICORN",
            "AQUARIUS",
            "PISCES",
            "ARIES",
            "TAURUS",
            "GEMINI",
            "CANCER",
            "LEO",
            "VIRGO",
            "LIBRA",
            "SCORPIO",
            "SAGITTARIUS",
            "CAPRICORN",
            "AQUARIUS",
            "PISCES"
        ]
    }

    var documents = [];
    for (var i = 0; i < horoscope.text.length; ++i) {
        documents.push({
            id: "hId-" + i,
            text: horoscope.text[i],
            weights: horoscope.weights[i],
            sign: horoscope.signs[i]
        });
    }
    cpsConn.sendRequest(new cps.InsertRequest(documents), function (err, resp) {
        if (err) {
            return console.error(err);
        } // Handle error
    });
}
