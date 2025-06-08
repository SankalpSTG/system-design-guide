# Clarifying Questions

1. [Designing Online/Offline indicator](#)
1. [Designing Elevator System](#)

## Designing Online/Offline indicator

### Questions
1. What defines "online"?
    - Logged-in user
    - Active in last x minutes
    - Open Socket Connection
    - Ping Interval
2. Should it support multi-device login?
    - for e.g. Phone and Web simultaneously
3. Should presence be real-time or eventually consistent?
4. How fast should status reflect?
    - instant or within seconds
5. Who can see the status?
    - Everyone, only friends, specific roles?
6. What states do we need?
    - Onlie / Offline or more like idle and DND, etc.
7. What platforms are in scope?
    - Web, Ios, Android
8. Should there be a last seen/timestamp?
    - Last online at x
9. Do we need historical presence logs?
    - Just current state or store history
10. Should this work offline (client cache)?
11. Are bot/system users treated differently?

### Ideal Functional Requirements
- Show real-time online/offline status of users.
- Status visible to allowed parties (e.g., friends).
- Status sync across devices.
- Show "Last Seen" time if user is offline.
- Update status on:
    - App open/close.
    - Foreground/background.
    - Explicit logout or session expiry.
- Ability to handle intermittent connectivity.
- Users can toggle visibility ("invisible mode").
- APIs for:
    - Checking user status.
    - Updating own status.
    - Bulk status fetch (for showing friend lists).

### Ideal Non Functional Requirements
- Scalability:
    - Must handle billions of concurrent users.
    - Efficient pub/sub system for status changes.
- Availability:
    - 99.99% uptime for presence APIs.
    - Fault tolerance across data centers.
- Performance:
    - Online status updates must propagate in <1s.
    - Read latency <100ms for contact lists.
- Consistency:
    - Eventual consistency is acceptable for remote users.
    - Prefer strong consistency for self-status.
- Durability:
    - Not all presence updates need to be durable.
    - Last seen timestamp should be persistently stored.
- Security & Privacy:
    - Status should not be leaked to unauthorized users.
    - User should be able to opt-out of presence sharing.
- Cost Efficiency:
    - Efficient use of infra like WebSocket servers and in-memory stores.
- Monitoring & Alerting:
    - Track delivery delay, missed events, failure rate.

### Edge Cases
- User is online on multiple devices – how do we aggregate?
- User force kills the app — how to detect?
- Network drop without clean disconnect.
- Misbehaving clients sending wrong status.
- Throttling updates from spammy clients.
- Time skew on client-side status timestamps.

### Tech Considerations
- Protocol: Use WebSockets for real-time, fallback to polling or MQTT for mobile.
- Store: Redis or DynamoDB for fast reads/writes.
- Events: Kafka or Redis Pub/Sub for propagation.
- Client SDKs: Mobile, web must support presence pings, heartbeats.
- TTL for statuses in cache to auto-expire after inactivity.


## Designing Elevator System
### Questions
1. Building & Usage Context
    - What type of building is this? (residential, commercial, hospital, skyscraper)
    - How many floors does the building have?
    - How many elevators will be installed?
    - Expected peak traffic hours and passenger volume?
2. Elevator Specifics
    - What is the capacity (number of people or weight limit)?
    - What speed should the elevator operate at?
    - Should there be express elevators for certain floors?
    - Should elevators serve all floors or skip some?
3. Control & Scheduling
    - How should multiple elevators coordinate? (independent or group control)
    - What is the preferred scheduling algorithm? (e.g., simple FIFO, destination dispatch)
    - How to handle priority requests? (emergency, VIP, maintenance)
    - Should the system optimize for energy efficiency?
4. User Interface & Experience
    - What type of input buttons will be provided? (physical, touchscreen)
    - Should there be voice commands or accessibility features?
    - What information should be displayed inside and outside elevators?
    - How to handle emergency communication?
5. Safety & Compliance
    - What safety standards or certifications must be met?
    - Are there specific emergency protocols to follow?
    - Should there be integration with fire alarms or building security?
6. Maintenance & Monitoring
    - Should the system provide remote monitoring and alerts?
    - What logging and diagnostics are required?
    - How often will maintenance be performed?
7. Non-functional
    - What is the acceptable maximum wait time for an elevator?
    - What is the expected system uptime and availability?
    - Is there a need for backup power or fail-safe mechanisms?
    - Are there cybersecurity requirements for the system?
8. Budget & Timeline
    - What is the budget for hardware and software?
    - What is the deployment timeline?