import React from 'react'
import Link from 'gatsby-link'
import { navigate } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import "../styles/albums.css"

const AlbumCard = ({ album }) => (
	<div class="fl w-50 w-25-m w-20-l pa2">
		<Link to={album.fields.slug} className="db link dim tc">
        <PreviewCompatibleImage imageInfo={{image: album.frontmatter.image}} className="w-100 db outline black-10" />
        <dl class="mt2 f6 lh-copy">
          <dt class="clip">Title</dt>
          <dd class="ml0 black truncate w-100">{album.frontmatter.title}</dd>
          <dt class="clip">Artist</dt>
          <dd class="ml0 gray truncate w-100">{album.frontmatter.artist}</dd>
        </dl>
		</Link>
	</div>
	)

export default AlbumCard
