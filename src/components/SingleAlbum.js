import React from 'react'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import "../styles/singleAlbum.css"

const SingleAlbum = ({ title, artist, image }) => (
	<div class="db center mw5 tc black">
  <PreviewCompatibleImage className="db ba b--black-10" imageInfo={{image: image}}/>
  <dl class="mt2 f6 lh-copy">
    <dt class="clip">Title</dt>
    <dd class="ml0">{title}</dd>
    <dt class="clip">Artist</dt>
    <dd class="ml0 gray">{artist}</dd>
  </dl>
</div>
	)

export default SingleAlbum