# SentraExam Tauri Boundary

This directory is reserved for the Tauri 2 + Rust host. The desktop client must communicate only with the school Edge API and its exam WebSocket during an attempt.

Required host responsibilities for the next phase:

- fullscreen and controlled exam window lifecycle;
- device/system readiness checks;
- encrypted local answer queue;
- restart and reconnect recovery;
- signed installer and update verification;
- secure bridge commands with explicit protocol versioning.

The host must not add Central Platform traffic to the participant exam path.
