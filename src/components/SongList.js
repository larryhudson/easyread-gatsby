import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from "gatsby"
import Link from 'gatsby-link'
import "../styles/blockItemDottedBorder.css"

const SongList = ({ children }) => (
	<ul class="list ph0 mh0 measure">
	{children}
    </ul>
	)

export default SongList