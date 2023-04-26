import React from 'react'
import { useSelector } from 'react-redux'

import PageLoading from './PageLoading.js'

export default function PageLoadingIndicator() {
	const isLoading = useSelector(state => state.preload.pending)
	return (
		<PageLoading show={isLoading}/>
	)
}