# VehSense Web App

`VehSense Web App` is an admin panel for managing fleets within the VehSense ecosystem.  
It is built using **React** and **Tailwind CSS**.  

## Overview

This web application allows admins to efficiently manage fleet users, vehicles, and reports.
It serves as the main interface for monitoring fleet operations and performing administrative tasks.

## Key Features

- User login and authentication  
- User management (add, edit, remove users)  
- Vehicle management (track and update vehicles)  
- Report overview and management  

## Getting Started

To run the project locally:  

1. Clone the repository:  
```bash
git clone https://github.com/czxrny/veh-sense-panel.git
```

2. Navigate to the project directory:
```
cd ./veh-sense-panel
```

3. Configure environment variables in .env.example:
```
nano ./.env.example
```

4. Copy .env.example to .env:
```
cp ./.env.example ./.env
```

5. Install dependencies:
```
npm install
```

6. Start the development server:
```
npm run dev
```

## TODO
- [ ] Implement JWT session logout

- [ ] UI updates and improvements

- [ ] Edit Fleet Vehicle State [shared, private]
