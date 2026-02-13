import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const bookChapter = await prisma.bookChapter.findFirst({
      where: {
        isDeleted: false,
      },
    });

    if (bookChapter) {
      const item = await prisma.item.findFirst({
        where: {
          chapterId: bookChapter.id,
        },
      });

      if (item) {
        return Response.json(
          { message: "Книга и продажа уже созданы" },
          { status: 400 },
        );
      }

      await prisma.item.create({
        data: {
          chapterId: bookChapter.id,
          price: 1490,
          currency: "RUB",
          status: "active",
        },
      });

      return Response.json({ success: true }, { status: 200 });
    }

    await prisma.$transaction(async (tx) => {
      const created = await tx.bookChapter.create({
        data: { title: "Знакомство с ИИ" },
      });

      for (const page of bookPages) {
        await tx.bookPage.create({
          data: {
            ...page,
            chapterId: created.id,
            levels: {
              create: page.levels.map((level) => ({
                ...level,
              })),
            },
          },
        });
      }
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Ошибка при выполнении seed" },
      { status: 500 },
    );
  }
}

const bookPages = [
  {
    title: "Знакомимся с ИИ",
    desc: "Знакомство с AI: Создаем любимого персонажа в QWEN",
    img: "https://altanschool.s3.eu-central-1.amazonaws.com/lessons/1766494642396_121700.png",
    tag: "1",
    type: ["Watch Then Do"],
    number: 1,
    levels: [
      {
        title: "1. Что такое ИИ?",
        content:
          '{"type":"doc","content":[{"type":"paragraph","attrs":{"textAlign":null},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Привет! Давай узнаем, что же такое ИИ и каким он бывает"},{"type":"text","marks":[{"type":"textStyle","attrs":{"color":""}},{"type":"bold"}],"text":"✨"},{"type":"hardBreak","marks":[{"type":"bold"}]},{"type":"text","marks":[{"type":"textStyle","attrs":{"color":""}}],"text":"Скорее смотри видео ниже, чтобы разобраться🤓⤵️"}]},{"type":"youtube","attrs":{"src":"https://youtu.be/q6M-63W09_0","start":0,"align":"center","width":"100%","height":480,"links":[{"type":"rutube","src":"https://rutube.ru/play/embed/b5d3ce9121311e4fe344bd9ac037c2f0/?p=0G4x_IwPWwe2XxWjjjqfWQ"}]}},{"type":"paragraph","attrs":{"textAlign":null}},{"type":"paragraph","attrs":{"textAlign":null}}]}',
        solid: true,
      },
      {
        title: "2. Учимся писать промты и создавать свой первый ИИ-рисунок",
        content:
          '{"type":"doc","content":[{"type":"heading","attrs":{"textAlign":null,"level":3},"content":[{"type":"text","text":"Прежде чем нам создать свой первый ИИ-рисунок, "},{"type":"hardBreak"},{"type":"text","text":"давай зарегистрируемся в нейросети QWEN✨"},{"type":"hardBreak"},{"type":"hardBreak"},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://chat.qwen.ai/","target":"_blank","rel":"noopener noreferrer nofollow","class":null}}],"text":"QWEN"},{"type":"text","text":" "},{"type":"text","marks":[{"type":"textStyle","attrs":{"color":""}}],"text":"⬅️ жми сюда, чтобы перейти сразу на сайт"},{"type":"hardBreak"},{"type":"hardBreak"},{"type":"text","marks":[{"type":"italic"}],"text":"Инструкция по регистрации вот тут "},{"type":"text","marks":[{"type":"textStyle","attrs":{"color":""}},{"type":"italic"}],"text":"⤵️"}]},{"type":"youtube","attrs":{"src":"https://youtu.be/MiVd2CfxIHc","start":0,"align":"center","width":"100%","height":480,"links":[{"type":"rutube","src":"https://rutube.ru/play/embed/b5c4ff0775e662137da2a5a8a708ce04/?p=YS0QR4JMIp77vK6KzvfjVg"}]}},{"type":"paragraph","attrs":{"textAlign":null}},{"type":"carousel","attrs":{"images":["https://altanschool.s3.eu-central-1.amazonaws.com/learns/1766561459017_804819.png","https://altanschool.s3.eu-central-1.amazonaws.com/learns/1766561511991_777121.png","https://altanschool.s3.eu-central-1.amazonaws.com/learns/1766561518510_995524.png","https://altanschool.s3.eu-central-1.amazonaws.com/learns/1766561526021_153621.png"],"width":"100%","align":"center"}},{"type":"heading","attrs":{"textAlign":null,"level":3},"content":[{"type":"text","text":"А теперь давай напишем интересный промт "},{"type":"hardBreak"},{"type":"text","text":"и создадим свою первую картинку с помощью ИИ 🤩"}]},{"type":"youtube","attrs":{"src":"https://youtu.be/YfLBOcAIWfI","start":0,"align":"center","width":"100%","height":480,"links":[{"type":"rutube","src":"https://rutube.ru/play/embed/f473efe479723fcfb03db0c33f77d4d7/?p=6vmNk6kDPqTBARYrtQ8itA"}]}},{"type":"paragraph","attrs":{"textAlign":null}},{"type":"imageBlock","attrs":{"src":"https://altanschool.s3.eu-central-1.amazonaws.com/learns/1766580248617_465972.png","width":"100%","align":"center"}},{"type":"heading","attrs":{"textAlign":null,"level":3},"content":[{"type":"text","marks":[{"type":"textStyle","attrs":{"color":""}},{"type":"bold"}],"text":"Важное задание для тебя "},{"type":"text","marks":[{"type":"textStyle","attrs":{"color":""}}],"text":"🤫"},{"type":"hardBreak"},{"type":"text","marks":[{"type":"textStyle","attrs":{"color":""}}],"text":"Создай 3 картинки, составляя промт по методу "},{"type":"text","marks":[{"type":"textStyle","attrs":{"color":""}},{"type":"underline"}],"text":"4 вопросов"},{"type":"text","marks":[{"type":"textStyle","attrs":{"color":""}}],"text":" на тему:"},{"type":"hardBreak","marks":[{"type":"textStyle","attrs":{"color":""}}]},{"type":"text","marks":[{"type":"textStyle","attrs":{"color":""}}],"text":"1. Ты в мире своей мечты "},{"type":"hardBreak","marks":[{"type":"textStyle","attrs":{"color":""}}]},{"type":"text","marks":[{"type":"textStyle","attrs":{"color":""}}],"text":"2. Идеальная профессия"},{"type":"hardBreak","marks":[{"type":"textStyle","attrs":{"color":""}}]},{"type":"text","marks":[{"type":"textStyle","attrs":{"color":""}}],"text":"3. Свободная тема - прояви свой полет фантазии!"},{"type":"hardBreak","marks":[{"type":"textStyle","attrs":{"color":""}}]}]},{"type":"carousel","attrs":{"images":["https://altanschool.s3.eu-central-1.amazonaws.com/learns/1766563243894_817443.png","https://altanschool.s3.eu-central-1.amazonaws.com/learns/1766563259366_818754.png","https://altanschool.s3.eu-central-1.amazonaws.com/learns/1766563266543_115412.png","https://altanschool.s3.eu-central-1.amazonaws.com/learns/1766563279936_664478.png"],"width":"100%","align":"center"}},{"type":"imageBlock","attrs":{"src":"https://altanschool.s3.eu-central-1.amazonaws.com/learns/1766641096306_716104.png","width":"100%","align":"center"}},{"type":"paragraph","attrs":{"textAlign":null}}]}',
        solid: true,
      },
    ],
  },
  {
    title: "Генерация видео в QWEN и музыки в SUNO",
    desc: "Cоздадим свое первое сгенерированное видео с помощью Qwen!",
    img: "https://altanschool.s3.eu-central-1.amazonaws.com/lessons/1766494950192_745721.png",
    tag: "1",
    type: ["Watch Then Do"],
    number: 2,
    levels: [
      {
        title: "Генерация музыки в SUNO",
        content:
          '{"type":"doc","content":[{"type":"heading","attrs":{"textAlign":null,"level":3},"content":[{"type":"text","text":"Давай зарегистрируемся на сайте SUNO🎵"},{"type":"hardBreak"},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://suno.com/","target":"_blank","rel":"noopener noreferrer nofollow","class":null}}],"text":"SUNO.com "},{"type":"text","text":"⬅️ жми сюда, чтобы перейти сразу на сайт"}]},{"type":"youtube","attrs":{"src":"https://youtu.be/7QHo0D_9H4I","start":0,"align":"center","width":"100%","height":480,"links":[]}},{"type":"heading","attrs":{"textAlign":null,"level":3},"content":[{"type":"text","text":"А теперь приступим к созданию своего музыкального хита "},{"type":"text","marks":[{"type":"textStyle","attrs":{"color":""}}],"text":"🎸"}]},{"type":"youtube","attrs":{"src":"https://youtu.be/T6hT-e-Pyzw","start":0,"align":"center","width":"100%","height":480,"links":[{"type":"rutube","src":"https://rutube.ru/play/embed/dc283492acc7045265aef2fc87ce9c1b/?p=7mziC7z4o5xVqOPNe1wUEg"}]}},{"type":"paragraph","attrs":{"textAlign":null}}]}',
        solid: true,
      },
      {
        title: "Генерация видео с помощью QWEN",
        content:
          '{"type":"doc","content":[{"type":"heading","attrs":{"textAlign":null,"level":3},"content":[{"type":"text","text":"Придумай свой сюжет для создания своего видео в "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://chat.qwen.ai/","target":"_blank","rel":"noopener noreferrer nofollow","class":null}}],"text":"QWEN"},{"type":"text","marks":[{"type":"textStyle","attrs":{"color":""}}],"text":"🎥"},{"type":"hardBreak"},{"type":"text","marks":[{"type":"textStyle","attrs":{"color":""}}],"text":"Скорее смотри видео ниже, чтобы начать⤵️"}]},{"type":"youtube","attrs":{"src":"https://youtu.be/0R7k710Osk4","start":0,"align":"center","width":"100%","height":480,"links":[{"type":"rutube","src":"https://rutube.ru/play/embed/ce90251ddb5cf7deed6842d195442e5e/?p=xOCOao-vGTZXjh5NARaFUw"}]}},{"type":"paragraph","attrs":{"textAlign":null}},{"type":"carousel","attrs":{"images":["https://altanschool.s3.eu-central-1.amazonaws.com/learns/1766659049408_401880.png","https://altanschool.s3.eu-central-1.amazonaws.com/learns/1766659062448_937499.png"],"width":"100%","align":"center"}},{"type":"imageBlock","attrs":{"src":"https://altanschool.s3.eu-central-1.amazonaws.com/learns/1766659075089_735791.png","width":"100%","align":"center"}},{"type":"imageBlock","attrs":{"src":"https://altanschool.s3.eu-central-1.amazonaws.com/learns/1766659083073_781518.png","width":"100%","align":"center"}},{"type":"paragraph","attrs":{"textAlign":null}}]}',
        solid: true,
      },
    ],
  },
];
