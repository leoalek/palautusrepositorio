```mermaid
    sequenceDiagram
    participant browser
    participant server

    note right of browser: new note as JSON {content:...,date:...}

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->browser: {message: "note created"}
    deactivate server 
```