Redux Flow (Important for Interviews)
Component
   ↓
dispatch(fetchUsers)
   ↓
Saga (takeLatest)
   ↓
API Call
   ↓
put(fetchUsersSuccess)
   ↓
Reducer updates state
   ↓
Component re-render
Why Redux-Saga?

Advantages:

Handles complex async logic
Better control over side effects
Supports debounce, throttle, cancellation
Uses generators (yield)

Example Saga Effects

call->	API calls
put->	dispatch action
takeLatest->	latest request
takeEvery->	every request
delay -> 	wait
