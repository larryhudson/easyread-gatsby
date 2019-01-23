import React from 'react'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import "../styles/tachyons.scss"
import Link from 'gatsby-link'

const Button = ({ link, component, children }) => {
	const className = 'f6 link dim ba bw1 ph3 pv2 mb2 mh2 dib near-black br2'

	return (
		<span>
	{component === "a" && (
		<a href={link} className={className}>{children}</a>
	)}
	{component === "Link" && (
		<Link to={link} className={className}>{children}</Link>
	)}
	</span>
	) }

export default Button