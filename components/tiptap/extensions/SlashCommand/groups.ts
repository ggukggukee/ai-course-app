import { Group } from './types'

export const GROUPS: Group[] = [
  {
    name: 'format',
    title: 'Format',
    commands: [
      {
        name: 'heading1',
        label: 'Heading 1',
        iconName: 'Heading1',
        description: 'High priority section title',
        aliases: ['h1'],
        action: editor => {
          editor.chain().focus().setHeading({ level: 1 }).run()
        },
      },
      {
        name: 'heading2',
        label: 'Heading 2',
        iconName: 'Heading2',
        description: 'Medium priority section title',
        aliases: ['h2'],
        action: editor => {
          editor.chain().focus().setHeading({ level: 2 }).run()
        },
      },
      {
        name: 'heading3',
        label: 'Heading 3',
        iconName: 'Heading3',
        description: 'Low priority section title',
        aliases: ['h3'],
        action: editor => {
          editor.chain().focus().setHeading({ level: 3 }).run()
        },
      },
      {
        name: 'bulletList',
        label: 'Bullet List',
        iconName: 'List',
        description: 'Unordered list of items',
        aliases: ['ul'],
        action: editor => {
          editor.chain().focus().toggleBulletList().run()
        },
      },
      {
        name: 'numberedList',
        label: 'Numbered List',
        iconName: 'ListOrdered',
        description: 'Ordered list of items',
        aliases: ['ol'],
        action: editor => {
          editor.chain().focus().toggleOrderedList().run()
        },
      },
      {
        name: 'taskList',
        label: 'Task List',
        iconName: 'ListTodo',
        description: 'Task list with todo items',
        aliases: ['todo'],
        action: editor => {
          editor.chain().focus().toggleTaskList().run()
        },
      },
      {
        name: 'blockquote',
        label: 'Blockquote',
        iconName: 'Quote',
        description: 'Element for quoting',
        action: editor => {
          editor.chain().focus().setBlockquote().run()
        },
      },
      {
        name: 'codeBlock',
        label: 'Code Block',
        iconName: 'SquareCode',
        description: 'Code block with syntax highlighting',
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => {
          editor.chain().focus().setCodeBlock().run()
        },
      },
    ],
  },
  {
    name: 'insert',
    title: 'Insert',
    commands: [
      {
        name: 'image',
        label: 'Image',
        iconName: 'Image',
        description: 'Insert an image',
        aliases: ['img'],
        action: editor => {
          editor.chain().focus().setImageUpload().run()
        },
      },
      {
        name: 'carousel',
        label: 'Слайдер',
        iconName: 'Image',
        description: 'Insert a carousel of images',
        aliases: ['carousel'],
        action: editor => {
          editor.chain().focus().setCarouselUpload().run()
        },
      },
      {
        name: 'double',
        label: 'Двойной',
        iconName: 'Image',
        description: 'Insert a double image',
        aliases: ['double'],
        action: editor => {
          editor.chain().focus().setDoubleUpload().run()
        },
      },
      {
        name: 'youtube',
        label: 'Youtube',
        iconName: 'Youtube',
        description: 'Insert a youtube video',
        aliases: ['youtube'],
        action: editor => {
          const prompt = window.prompt('Enter the URL of the YouTube video')
          if (!prompt) return
          editor.chain().focus().setYoutubeVideo({ src: prompt }).run()
        },
      },
      {
        name: 'horizontalRule',
        label: 'Horizontal Rule',
        iconName: 'Minus',
        description: 'Insert a horizontal divider',
        aliases: ['hr'],
        action: editor => {
          editor.chain().focus().setHorizontalRule().run()
        },
      },
      {
        name: 'quiz',
        label: 'Тест',
        iconName: 'BookCheck',
        description: 'Insert a quiz',
        aliases: ['quiz'],
        action: editor => {
          editor.chain().focus().setQuiz().run()
        },
      },
      {
        name: 'hide',
        label: 'Скрыть',
        iconName: 'EyeOff',
        description: 'Insert a hide block',
        aliases: ['hide'],
        action: editor => {
          const title = window.prompt('Title')
          if (title) {
            editor.chain().focus().setHide({ title }).run()
          }
        },
      },
      {
        name: 'file',
        label: 'Файл',
        iconName: 'File',
        description: 'Insert a file',
        aliases: ['file'],
        action: editor => {
          editor.chain().focus().setFileUpload().run()
        },
      },
      {
        name: 'iframe',
        label: 'Embed',
        iconName: 'AppWindow',
        description: 'Insert a iframe',
        aliases: ['iframe'],
        action: editor => {
          const prompt = window.prompt('Enter the URL of the iframe')
          if (!prompt) return
          editor.chain().focus().setIframe({ src: prompt }).run()
        },
      },
      {
        name: 'form',
        label: 'Опрос',
        iconName: 'FilePlus',
        description: 'Insert a form',
        aliases: ['form'],
        action: editor => {
          editor.chain().focus().setForm().run()
        },
      },
    ],
  },
]

export default GROUPS
