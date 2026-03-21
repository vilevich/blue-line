import { useState, useRef, useCallback } from 'react'

/**
 * Tracks whether form state has changed from its initial snapshot.
 * Usage:
 *   const { fields, setField, isDirty, save, discard } = useDirtyTracking(initialFields)
 *
 * - fields: current form values
 * - setField(key, value): update a single field
 * - isDirty: true if any field differs from snapshot
 * - save(): captures current state as new snapshot, returns current fields
 * - discard(): restores fields to snapshot
 */
export function useDirtyTracking<T extends Record<string, unknown>>(initial: T) {
  const snapshot = useRef<T>({ ...initial })
  const [fields, setFields] = useState<T>({ ...initial })

  const isDirty = Object.keys(snapshot.current).some(
    (k) => JSON.stringify(fields[k]) !== JSON.stringify(snapshot.current[k]),
  )

  const setField = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setFields((prev) => ({ ...prev, [key]: value }))
  }, [])

  const save = useCallback(() => {
    snapshot.current = { ...fields }
    setFields({ ...fields }) // force re-render to recalc isDirty
    return fields
  }, [fields])

  const discard = useCallback(() => {
    setFields({ ...snapshot.current })
  }, [])

  return { fields, setField, isDirty, save, discard }
}
