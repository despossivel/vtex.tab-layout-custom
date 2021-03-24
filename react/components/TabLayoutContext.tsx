import React, { FunctionComponent, useContext, useReducer } from 'react'

interface TabLayoutContextProps {
  activeTab: string,
  checkEmptyContent: string
}

// interface ChangeActiveTabAction {
//   type: 'changeActiveTab'
//   payload: {
//     newActiveTab: string
//   }
// }

// interface CheckEmptyContentAction {
//   type: 'checkEmptyContent'
//   payload: {
//     newCheckEmptyContent: Boolean
//   }
// }


// interface TypesDispach {
//   ChangeActiveTabAction: String,
//   CheckEmptyContentAction: String
// }

type Dispatch = (action: any) => void

const initialState = {
  activeTab: "",
  checkEmptyContent: ""
}

const TabLayoutStateContext = React.createContext<TabLayoutContextProps>(initialState)
const TabLayoutDispatchContext = React.createContext<Dispatch | undefined>(undefined)

function reducer(state: any, action: any): TabLayoutContextProps {
  switch (action.type) {
    case 'changeActiveTab':
      if (action.payload.newActiveTab === state.activeTab) return state

      return {
        ...state,
        activeTab: action.payload.newActiveTab
      }

      break;

    case 'changeCheckEmptyContent':
      if (action.payload.newCheckEmptyContent === state.checkEmptyContent) return state

      return {
        ...state,
        checkEmptyContent: action.payload.newCheckEmptyContent
      }

    default:
      return state
  }
}

const TabLayoutContextProvider: FunctionComponent<
  TabLayoutContextProps
> = ({ children, activeTab, checkEmptyContent }) => {
  const [state, dispatch] = useReducer(reducer, {
    activeTab,
    checkEmptyContent
  })
  return <TabLayoutStateContext.Provider value={state}>
    <TabLayoutDispatchContext.Provider value={dispatch}>
      {children}
    </TabLayoutDispatchContext.Provider>
  </TabLayoutStateContext.Provider>

}

function useTabState() {
  const context = useContext(TabLayoutStateContext)
  if (context === undefined) {
    throw new Error(
      'useTabState must be used within a TabLayoutStateContextProvider'
    )
  }
  return context
}

function useTabDispatch() {
  const context = useContext(TabLayoutDispatchContext)

  if (context === undefined) {
    throw new Error(
      'useTabDispatch must be used within a TabLayoutDispatchContextProvider'
    )
  }
  return context
}

export { TabLayoutContextProvider, useTabDispatch, useTabState }