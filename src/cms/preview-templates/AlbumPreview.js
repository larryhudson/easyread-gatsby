import React from 'react'
import PropTypes from 'prop-types'
import { AlbumTemplate } from '../../templates/album'

const AlbumPreview = ({ entry, widgetFor }) => (
  <AlbumTemplate
    content={widgetFor('body')}
    blurb={entry.getIn(['data', 'blurb'])}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'title'])}
    image={entry.getIn(['data', 'image'])}
    favouriteSongs={entry.getIn(['data', 'favouriteSongs'])}
    listenLinks={entry.getIn(['data', 'listenLinks'])}
  />
)

AlbumTemplate.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default AlbumPreview
