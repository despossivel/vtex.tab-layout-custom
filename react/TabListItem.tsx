import React, { useEffect } from 'react'
import { defineMessages } from 'react-intl'

import { Button } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'

import { useTabState, useTabDispatch } from './components/TabLayoutContext'
import { useDeprecatedDefaultActiveTab } from './modules/useDeprecatedDefaultActiveTab'

const CSS_HANDLES = ['listItem', 'listItemActive'] as const

interface Props {
  tabId: string
  label: string
  /**
   * @deprecated This prop should not be used
   */
  defaultActiveTab: boolean
  position: number
}

function TabListItem(props: Props) {
  const { tabId, label, defaultActiveTab, position } = props,
    handles = useCssHandles(CSS_HANDLES),
    { activeTab, ...restTabState } = useTabState(),
    dispatch = useTabDispatch()


  useEffect(() => {
    if (activeTab !== restTabState?.checkEmptyContent) return;
    if (restTabState?.checkEmptyContent === "") return;

    dispatch({
      type: 'changeActiveTab',
      payload: { newActiveTab: 'item1' },
    })

  }, [restTabState, activeTab])

  useEffect(() => dispatch({
    type: 'changeActiveTab',
    payload: { newActiveTab: tabId },
  }), [tabId])

  useDeprecatedDefaultActiveTab(defaultActiveTab, tabId)

  const isActive = activeTab === tabId || (!activeTab && position === 0)

  const handleClick = () => dispatch({
    type: 'changeActiveTab',
    payload: { newActiveTab: tabId },
  })

  if (!label || label === '') return null

  if (restTabState?.checkEmptyContent === tabId) return null;

  return <div
    className={`${handles.listItem} ${isActive ? handles.listItemActive : ''
      } ph2 pv2 ma2`}>
    <Button
      variation={isActive ? 'primary' : 'tertiary'}
      onClick={handleClick} >
      {label}
    </Button>
  </div>;
}

const messages = defineMessages({
  title: {
    id: 'admin/editor.tabListItem.title',
  },
  description: {
    id: 'admin/editor.tabListItem.description',
  },
})

TabListItem.schema = {
  title: messages.title.id,
  description: messages.description.id,
}

export default TabListItem
