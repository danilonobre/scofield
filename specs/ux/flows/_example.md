<!-- mentor:file
Template for individual user flow spec files. Copy this file and rename it to [flow-name].md when documenting a new flow. Flow specs document the complete sequence of steps for a user journey — including the happy path and all edge cases. The AI uses these files to implement end-to-end interactions correctly.
priority: medium
-->

# [Flow Name]

<!-- mentor:file
Replace [Flow Name] with the actual flow name. A flow documents one complete user journey from trigger to completion. Flows are distinct from screens — a flow can span multiple screens.
priority: medium
-->

## Trigger

<!-- mentor
What starts this flow? A user action, a system event, a navigation event? The trigger defines the entry point for implementation. If there are multiple triggers for the same flow, list them all.

quality signals:
- Trigger is a specific user action or system event, not a vague starting point
- The context in which the trigger occurs is described (which screen? what state?)
- If the trigger is conditional (only available when X is true), the condition is stated
-->

## Steps

<!-- mentor
The sequence of steps in the flow, from trigger to completion. Each step should describe the user action and the system response. Steps should be numbered and sequential. Branch points should be noted with indentation or conditional language.

quality signals:
- Steps alternate between user actions and system responses
- System responses describe what the user sees, not just what happens internally
- Happy path is complete from start to finish
- Branch points are identified (if X, then Y; if not X, then Z)
- The final step reaches a clear terminal state
-->

## Edge cases

<!-- mentor
What happens if the user takes an unexpected path? What if they navigate away mid-flow? What if required data is missing? Edge cases are where implementation bugs hide — they must be defined before implementation, not discovered after.

quality signals:
- At least 2-3 edge cases are identified for any non-trivial flow
- Each edge case has a defined system behavior
- Edge cases cover: user navigation away, missing data, concurrent access (if applicable)
-->

## Empty states

<!-- mentor
What does the user see when a step in this flow encounters no data? Empty states are among the most commonly under-designed aspects of a product. Each step that loads data should have an empty state defined.

quality signals:
- Empty state is defined for every step that fetches or displays data
- Empty state includes what the user sees (illustration? message? CTA?)
- Empty state includes the action available to the user, if any
-->

## Error states

<!-- mentor
What does the user see when something fails? Each step that makes a network call, API call, or mutation should have an error state defined. "Show an error message" is not sufficient — what message, where, with what recovery action?

quality signals:
- Every network-dependent step has an error state
- Error messages are described (or referenced from a copy spec)
- Recovery actions are defined (retry? navigate away? contact support?)
- Partial failure is addressed if the flow involves multiple operations
-->
