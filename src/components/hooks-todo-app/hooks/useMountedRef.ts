import React from 'react'

export const useMountedRef = () => {
    const mountedRef = React.useRef(false)

    React.useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
        }
    })

    return mountedRef
}
