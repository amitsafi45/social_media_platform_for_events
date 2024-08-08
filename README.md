# Social Media Platform for Events

## Description
This project is a social media platform tailored for event management. It allows users to sign up, sign in, create events, follow other users, comment on events, like events, and upload media.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-repo/social-media-platform-for-events.git
    cd social-media-platform-for-events
    ```

2. **Install the dependencies:**

    ```bash
    npm install
    ```

3. **Create a `.env` file with the following environment variables:**

    ```env
    PORT=4000
    REFRESH_SECRET_KEY=jsdfhjsdfsdjfjdsfhsdjjksdhfkjshdfkhsdfsdfsdfskdjhfhsfujsfhjshfghsghdgsddfghsddgfhsgfhjgdjfsjgfsjhgs
    ACCESS_SECRET_KEY=kjhjhdusdufyusydfuihskjdkhfsjhfshfsfdusdfuysdyfskjdhfkjshdfkjsdhfksjdfhsjdfhsjdfhsjhfsjfhsfsjdfhsfj
    REFRESH_TOKEN_EXPIRES_IN=1d
    ACCESS_TOKEN_EXPIRES_IN=2d
    THROTTLE_TTL=6000
    THROTTLE_LIMIT=50
    ENVIRONMENT=Development
    DB_HOST=localhost
    DB_USERNAME=postgres
    DB_PASSWORD=Admin@12356
    DB_PORT=5432
    DB_DATABASE=social_media
    DB_SYNCHRONIZE=true
    ```

4. **Run the migrations:**

    ```bash
    npm run migration:run
    ```

## Running the application

- **Development:**

    ```bash
    npm run start:dev
    ```

- **Production:**

    ```bash
    npm run build
    npm run start:prod
    ```

## API Documentation
when project run in "Development" Environment 
API documentation is available at: http://localhost:4000/api

## Scripts

- **Build**: `npm run build`  
  Build the project.

- **Start**: `npm run start`  
  Start the project.

- **Dev**: `npm run start:dev`  
  Run the project in development mode.

- **Lint**: `npm run lint`  
  Run the linter and fix issues.

- **Migrations**:  
  - **Run Migrations**: `npm run migration:run`
  - **Generate Migration**: `npm run migration:generate --name=<MigrationName>`
  - **Create Migration**: `npm run migration:create --name=<MigrationName>`
  - **Revert Migration**: `npm run migration:revert`
  - **Show Migrations**: `npm run migration:show`


