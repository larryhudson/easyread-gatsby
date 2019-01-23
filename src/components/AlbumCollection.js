import React from 'react'
import Link from 'gatsby-link'
import { navigate } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import "../styles/albums.css"

const AlbumCollection = ({ children }) => (
	<div class="cf pa2">
		{children}
    </div>
	)

export default AlbumCollection
