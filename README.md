# Flight Search App

![May-25-2025 16-34-50](https://github.com/user-attachments/assets/3b9bf9b3-fad9-4735-9b6b-358e715bc8a7)


A simple React + TypeScript app to search for flights between airports, using Ant Design components.
Bootstrapped with Vite.

## To run

```
npm install
```

```
npm run dev
```

## To run e2e cypress tests

Make sure the app is running on http://localhost:5173/ then

```
npm run cypress
```

## Other scripts

Linting

```
npm run lint
```

Apply prettier formatting

```
npm run format
```

### What I have done

- Added Ant Design as a component library to speed up development
- Implemented all required features from the assignment
- Added some additional features:
- - URL-based search navigation
- - Skeleton loading with simulated backend methods
- Created some simple end-to-end Cypress tests

### What I would have done with more time

- Improve CSS organization, currently uses mostly inline styles due to time constraints
- Refactor code to make components more atomic and reusable
- Improve styling of rushed components (e.g., skeleton loader)
- Add better error-handling UIs
- Improve responsive design, it's partially responsive but not fully
- Add complete integration and E2E test coverage
- Address some compatibility issues with Ant Design and React 19
- Improve form validation, being showed only on Submit
