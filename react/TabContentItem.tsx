import React, { useEffect } from 'react'
import { defineMessages } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
import {
  useTabState,
  useTabDispatch
} from './components/TabLayoutContext'

const CSS_HANDLES = ['contentItem'] as const

interface Props {
  tabId: string
  position: number
}

const TabContentItem: StorefrontFunctionComponent<Props> = props => {
  const { tabId, children, position } = props,
    handles = useCssHandles(CSS_HANDLES),
    { activeTab } = useTabState(),
    dispatch = useTabDispatch(),
    shouldShow = activeTab === tabId || (!activeTab && position === 0)

  useEffect(() => {

    if (!children) return;

    if (activeTab !== props.tabId) return;

    const TT = React.Children.map(children, (thisArg) => thisArg)

    if (TT.length !== 0) return;

    dispatch({
      type: 'changeCheckEmptyContent',
      payload: { newCheckEmptyContent: `${activeTab}` },
    })

  }, [activeTab])

  if (!shouldShow) return null

  return <div className={`${handles.contentItem} w-100`}>
    {children}
  </div>;

}

const messages = defineMessages({
  title: {
    defaultMessage: '',
    id: 'admin/editor.tabContentItem.title',
  },
  description: {
    defaultMessage: '',
    id: 'admin/editor.tabContentItem.description',
  },
})

TabContentItem.schema = {
  title: messages.title.id,
  description: messages.description.id,
}

export default TabContentItem