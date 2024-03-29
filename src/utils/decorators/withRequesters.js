import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'
import forEach from 'lodash/forEach'
import get from 'lodash/get'

export default requesters =>
  compose(
    lifecycle({
      componentWillMount() {
        forEach(requesters, (action, key) => {
          const object = this.props[key]
          !object.isLoading && !object.isValid && action(this.props)
        })
      },
      componentWillReceiveProps(nextProps) {
        forEach(requesters, (action, key) => {
          const nextObject = get(nextProps, key)
          !nextObject.isLoading && !nextObject.isValid && action(this.props)
        })
      },
    })
  )
