export const initialContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        textAlign: "left",
        level: 1,
      },
      content: [
        {
          type: "text",
          text: " Next.js + Tiptap Block Editor Template",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        class: null,
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          text: "Welcome to our React Block Editor Template built on top of ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://tiptap.dev/",
                target: "_blank",
                class: null,
              },
            },
          ],
          text: "Tiptap",
        },
        {
          type: "text",
          text: ", ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://nextjs.org/",
                target: "_blank",
                class: null,
              },
            },
          ],
          text: "Next.js",
        },
        {
          type: "text",
          text: " and ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://tailwindcss.com/",
                target: "_blank",
                class: null,
              },
            },
          ],
          text: "Tailwind",
        },
        {
          type: "text",
          text: ". This project can be a good starting point for your own implementation of a block editor.",
        },
      ],
    },
    {
      type: "codeBlock",
      attrs: {
        language: null,
      },
      content: [
        {
          type: "text",
          text: "import { useEditor, EditorContent } from '@tiptap/react'\n\nfunction App() {\n  const editor = useEditor()\n\n  return <EditorContent editor={editor} />\n}",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        class: null,
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          text: "This editor includes features like:",
        },
      ],
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "A DragHandle including a DragHandle menu",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "A Slash menu that can be triggered via typing a ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "code",
                    },
                  ],
                  text: "/",
                },
                {
                  type: "text",
                  text: " into an empty paragraph or by using the ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "bold",
                    },
                  ],
                  text: "+ Button",
                },
                {
                  type: "text",
                  text: " next to the drag handle",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "A TextFormatting menu that allows you to change the ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "textStyle",
                      attrs: {
                        fontSize: "18px",
                        fontFamily: null,
                        color: null,
                      },
                    },
                  ],
                  text: "font size",
                },
                {
                  type: "text",
                  text: ", ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "bold",
                    },
                  ],
                  text: "font weight",
                },
                {
                  type: "text",
                  text: ", ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "textStyle",
                      attrs: {
                        fontSize: null,
                        fontFamily: "Georgia",
                        color: null,
                      },
                    },
                  ],
                  text: "font family",
                },
                {
                  type: "text",
                  text: ", ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "textStyle",
                      attrs: {
                        fontSize: null,
                        fontFamily: null,
                        color: "#b91c1c",
                      },
                    },
                  ],
                  text: "color",
                },
                {
                  type: "text",
                  text: ", ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "highlight",
                      attrs: {
                        color: "#7e7922",
                      },
                    },
                  ],
                  text: "highlight",
                },
                {
                  type: "text",
                  text: " and more",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "A Table of Contents that can be viewed via clicking on the button on the top left corner",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "Live collaboration including content synchronization and collaborative cursors",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "AI implementation with text and image generation and auto completion via the ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "code",
                    },
                  ],
                  text: "TAB",
                },
                {
                  type: "text",
                  text: " key.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "imageBlock",
      attrs: {
        src: "/placeholder-image.jpg",
        width: "100%",
        align: "center",
      },
    },
    {
      type: "heading",
      attrs: {
        textAlign: "left",
        level: 2,
      },
      content: [
        {
          type: "text",
          text: "Get started",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        class: null,
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          text: "To access our block editor template, simply head over to your ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://cloud.tiptap.dev/react-templates",
                target: "_blank",
                class: null,
              },
            },
          ],
          text: "Tiptap Account",
        },
        {
          type: "text",
          text: " If you are not already a member, sign up for an account and complete the 2-minute React Template survey. Once finished, we will send you an invite to the private GitHub repository.",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        textAlign: "left",
        level: 2,
      },
      content: [
        {
          type: "text",
          text: "Installed extensions",
        },
      ],
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap-pro/extension-ai",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap-pro/extension-details",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap-pro/extension-details-content",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap-pro/extension-details-summary",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap-pro/extension-drag-handle",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap-pro/extension-drag-handle-react",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap-pro/extension-emoji",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap-pro/extension-file-handler",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap-pro/extension-mathematics",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap-pro/extension-node-range",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap-pro/extension-table-of-contents",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap-pro/extension-unique-id",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap/extension-bullet-list",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap/extension-character-count",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap/extension-code-block",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap/extension-code-block-lowlight",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap/extension-collaboration",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap/extension-collaboration-cursor",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap/extension-color",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap/extension-document",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap/extension-dropcursor",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap/extension-focus",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap/extension-font-family",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap/extension-heading",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap/extension-highlight",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap/extension-horizontal-rule",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap/extension-image",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap/extension-link",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap/extension-ordered-list",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap/extension-paragraph",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap/extension-placeholder",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap/extension-subscript",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap/extension-superscript",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap/extension-table",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap/extension-table-header",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap/extension-table-row",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap/extension-task-item",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap/extension-task-list",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap/extension-text-align",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap/extension-text-style",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap/extension-typography",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "@tiptap/extension-underline",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        class: null,
        textAlign: "left",
      },
    },
    {
      type: "youtube",
      attrs: {
        start: 0,
        src: "https://youtu.be/GbebJ3sx9dU",
        width: "100%",
        align: "center",
        links: [
          {
            type: "rutube",
            src: "https://rutube.ru/play/embed/65c99384063274a6fb615c3b656a6761",
          },
        ],
      },
    },
    {
      type: "double",
      attrs: {
        images: [
          "https://i.ytimg.com/vi/A_SSyMjme4c/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCjkOcBo5izk7D42jbmN732-0KRdA",
          "https://i.ytimg.com/vi/U-5_g-aH25E/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLC-SGkn2m4L09IfCmJ5N4DCdXWnoA",
        ],
      },
    },
    {
      type: "carousel",
      attrs: {
        images: [
          "https://i.ytimg.com/vi/A_SSyMjme4c/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCjkOcBo5izk7D42jbmN732-0KRdA",
          "https://i.ytimg.com/vi/U-5_g-aH25E/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLC-SGkn2m4L09IfCmJ5N4DCdXWnoA",
          "https://i.ytimg.com/vi/A_SSyMjme4c/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCjkOcBo5izk7D42jbmN732-0KRdA",
        ],
      },
    },
    {
      type: "iframe",
      attrs: {
        src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        width: "100%",
        align: "center",
      },
    },
    {
      type: "hide",
      attrs: {
        title: "Hide",
      },
      content: [
        {
          type: "paragraph",
          attrs: {
            class: null,
            textAlign: "left",
          },
          content: [
            {
              type: "text",
              text: "Hide",
            },
          ],
        },
      ],
    },
    {
      type: "dnd",
      attrs: {
        items: {
          text: "Как расположены атрибуты функции  create_ball( )?",
          direction: "horizontal",
          question: [
            {
              id: "20973499-2e27-414a-a304-fc524fa5c4b3",
              content: "x",
            },
            {
              id: "dc536576-f3ae-42bd-9203-614e8dd671a1",
              content: "y",
            },
          ],
          answer: [],
        },
      },
    },
    {
      type: "quiz",
      attrs: {
        quiz: [
          {
            prompt: "Chicken",
            writable: false,
            options: [
              {
                text: "1 picture",
                isCorrect: true,
              },
              {
                text: "2 picture",
                isCorrect: true,
              },
            ],
          },
          {
            prompt: "Biscuits",
            writable: false,
            options: [
              {
                text: "1 picture",
                isCorrect: true,
              },
              {
                text: "2 picture",
                isCorrect: false,
              },
            ],
          },
          {
            prompt: "Meatballs",
            writable: false,
            options: [
              {
                text: "1 picture",
                isCorrect: true,
              },
              {
                text: "2 picture",
                isCorrect: true,
              },
            ],
          },
          {
            prompt: "Sandwiches",
            writable: false,
            options: [
              {
                text: "1 picture",
                isCorrect: false,
              },
              {
                text: "2 picture",
                isCorrect: true,
              },
            ],
          },
          {
            prompt: "Rice",
            writable: false,
            options: [
              {
                text: "1 picture",
                isCorrect: true,
              },
              {
                text: "2 picture",
                isCorrect: false,
              },
            ],
          },
          {
            prompt: "Cereal",
            writable: false,
            options: [
              {
                text: "1 picture",
                isCorrect: false,
              },
              {
                text: "2 picture",
                isCorrect: true,
              },
            ],
          },
          {
            prompt: "Chips",
            writable: false,
            options: [
              {
                text: "1 picture",
                isCorrect: false,
              },
              {
                text: "2 picture",
                isCorrect: true,
              },
            ],
          },
          {
            prompt: "Yogurt",
            writable: false,
            options: [
              {
                text: "1 picture",
                isCorrect: true,
              },
              {
                text: "2 picture",
                isCorrect: true,
              },
            ],
          },
        ],
      },
    },
    {
      type: "quiz",
      attrs: {
        quiz: [
          {
            prompt: "This is my school.",
            writable: true,
            options: [
              {
                proper: "4",
                response: "",
              },
            ],
            image:
              "https://altanschool.s3.eu-central-1.amazonaws.com/learns/1739705582460_573516.png",
          },
          {
            prompt: "It is yellow.",
            writable: true,
            options: [
              {
                proper: "3",
                response: "",
              },
            ],
            image:
              "https://altanschool.s3.eu-central-1.amazonaws.com/learns/1739705588516_895683.png",
          },
          {
            prompt: "My desk is brown and grey.",
            writable: true,
            options: [
              {
                proper: "6",
                response: "",
              },
            ],
            image:
              "https://altanschool.s3.eu-central-1.amazonaws.com/learns/1739705592203_199737.png",
          },
          {
            prompt: "The board is green.",
            writable: true,
            options: [
              {
                proper: "4",
                response: "",
              },
            ],
            image:
              "https://altanschool.s3.eu-central-1.amazonaws.com/learns/1739705596376_328754.png",
          },
        ],
      },
    },
    {
      type: "form",
      attrs: {
        uuid: "f0e2becc-0a28-4523-8340-095ce23de936",
        form: [
          {
            id: "157e382c-cf26-48f3-9680-5809aed49541",
            prompt: "Как твои дела? 👋😉",
            type: "short",
            image: "",
          },
          {
            id: "4f3f9b1c-e514-45a8-8062-4beac8fd40f6",
            prompt: "Какой урок больше всего тебе понравился? 😍",
            type: "multiple",
            image: "",
            options: [
              {
                optionId: "ac6ae185-777c-4cb1-942c-7c9038f31344",
                text: "Урок 1. Нумерованный и маркированный список",
                image: "",
              },
              {
                optionId: "4b9de0ea-0f2f-4722-87bd-8ff1ef72782a",
                text: "Урок 2. Панель навигации",
                image: "",
              },
              {
                optionId: "92a28162-10d4-49a4-aa43-38f83154303e",
                text: "Урок 3. Кнопки button",
                image: "",
              },
              {
                optionId: "b4312694-55d3-4093-bb32-6d124e9810d5",
                text: "Урок 4. Анимация",
                image: "",
              },
              {
                optionId: "4d33d8dd-5bc7-482b-a56d-4ac4a6a5bd16",
                text: "Урок 5. Форма поиска",
                image: "",
              },
              {
                optionId: "7cb5f071-ec9a-44f6-90e9-d3e127047ac0",
                text: "Урок 6. Публикация сайта",
                image: "",
              },
              {
                optionId: "78d198be-82ca-4b40-b786-ed5d5fdafc09",
                text: "Урок 7-8. Проектная работа",
                image: "",
              },
            ],
          },
          {
            id: "b4db6251-31f4-42c8-ac86-f1783f85e109",
            prompt: "Какой урок является сложным в изучении? 😢",
            type: "multiple",
            image: "",
            options: [
              {
                optionId: "24f532d8-d7c6-4738-a60d-90f916052396",
                text: "Урок 1. Нумерованный и маркированный список",
                image: "",
              },
              {
                optionId: "bc377125-44f6-49cd-adb4-8082bb6339ae",
                text: "Урок 2. Панель навигации",
                image: "",
              },
              {
                optionId: "aa064eb6-0aab-4fa5-a6eb-57001f7f29a8",
                text: "Урок 3. Кнопки button",
                image: "",
              },
              {
                optionId: "274c859b-2c5f-43cb-b254-bb3bd91be926",
                text: "Урок 4. Анимация",
                image: "",
              },
              {
                optionId: "a6a2af44-fa40-4b6e-9921-acce03becf62",
                text: "Урок 5. Форма поиска",
                image: "",
              },
              {
                optionId: "8f96dfca-d119-42c0-bf60-32389bfe9f15",
                text: "Урок 6. Публикация сайта",
                image: "",
              },
              {
                optionId: "74a18198-0491-45c8-8a77-a5d46d141268",
                text: "Урок 7-8. Проектная работа",
                image: "",
              },
            ],
          },
          {
            id: "75f90ffc-dc5e-4e4f-8835-3e572d272f72",
            prompt: "Что ты узнал за этот месяц обучения? 🤗",
            type: "short",
            image: "",
          },
          {
            id: "3c301639-7b32-4a7a-ad53-2de281794a95",
            prompt:
              "Что бы ты хотел изменить / добавить? Напиши свои пожелания 😉",
            type: "short",
            image: "",
          },
        ],
      },
    },
  ],
};
