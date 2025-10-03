import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Document } from '@contentful/rich-text-types'

interface RichTextRendererProps {
  content: Document
}

export function RichTextRenderer({ content }: RichTextRendererProps) {
  const options = {
    renderNode: {
      // Custom rendering for different node types
      'heading-1': (node: any, children: any) => (
        <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-8 first:mt-0">
          {children}
        </h1>
      ),
      'heading-2': (node: any, children: any) => (
        <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-6 first:mt-0">
          {children}
        </h2>
      ),
      'heading-3': (node: any, children: any) => (
        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4 first:mt-0">
          {children}
        </h3>
      ),
      'paragraph': (node: any, children: any) => (
        <p className="text-gray-800 leading-relaxed mb-4">
          {children}
        </p>
      ),
      'unordered-list': (node: any, children: any) => (
        <ul className="list-disc list-inside text-gray-800 mb-4 space-y-2">
          {children}
        </ul>
      ),
      'ordered-list': (node: any, children: any) => (
        <ol className="list-decimal list-inside text-gray-800 mb-4 space-y-2">
          {children}
        </ol>
      ),
      'list-item': (node: any, children: any) => (
        <li className="text-gray-800 leading-relaxed">
          {children}
        </li>
      ),
      'blockquote': (node: any, children: any) => (
        <blockquote className="border-l-4 border-primary pl-4 italic text-gray-700 mb-4">
          {children}
        </blockquote>
      ),
      'hyperlink': (node: any, children: any) => (
        <a 
          href={node.data.uri} 
          className="text-primary hover:text-primary/80 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
      'bold': (node: any, children: any) => (
        <strong className="font-semibold text-gray-900">
          {children}
        </strong>
      ),
      'italic': (node: any, children: any) => (
        <em className="italic text-gray-900">
          {children}
        </em>
      ),
    },
  }

  return (
    <div className="prose prose-lg max-w-none">
      {documentToReactComponents(content, options)}
    </div>
  )
}
