export function download_file(content, name)
{
	if (typeof content === 'object')
	{
		content = JSON.stringify(content, null, 2)
	}

	const fake_form = document.createElement('form')
	fake_form.setAttribute('action', '/download')
	fake_form.setAttribute('method', 'post')

	const file_name = document.createElement('textarea')
	file_name.setAttribute('name', 'filename')
	file_name.innerHTML = name

	fake_form.appendChild(file_name)

	const text = document.createElement('textarea')
	text.setAttribute('name', 'data')
	text.innerHTML = content

	fake_form.appendChild(text)

	document.body.appendChild(fake_form[0])
	fake_form[0].submit()
	document.body.removeChild(fake_form[0])
}

export function upload_text_file(file)
{
	const reader = new FileReader()

	reader.onload = event =>
	{
		const text = event.target.result

		console.log('File content', text)
	}

	reader.readAsText(file)
}