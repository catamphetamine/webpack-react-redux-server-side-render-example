import DocumentMeta from 'react-document-meta'

// fixes strange bug: "ReferenceError: React is not defined"
import React from 'react'

export function webpage_title(title)
{
	return <DocumentMeta title={title}/>
}

export function webpage_head(title, description, meta)
{
	const metadata =
	{
		title,
		description,
		meta
	}

	return <DocumentMeta {...metadata}/>
}

export function server_generated_webpage_head()
{
	return DocumentMeta.renderAsReact()
}