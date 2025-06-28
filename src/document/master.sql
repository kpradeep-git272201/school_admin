CREATE TABLE tracker.user_roles (
    id BIGSERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL,
    role_code VARCHAR(20) UNIQUE NOT NULL,
    description VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_by BIGINT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tracker.user_roles (role_name, role_code, description, is_active)
VALUES 
  ('Admin', 'ROLE_ADMIN', 'System administrator with full access', TRUE),
  ('Manager', 'ROLE_MANAGER', 'Manager with elevated permissions', TRUE),
  ('User', 'ROLE_USER', 'Regular user with limited access', TRUE);


  CREATE TABLE tracker.issue_type (
    id             BIGSERIAL PRIMARY KEY,
    type_name      VARCHAR(50)  NOT NULL,
    type_code      VARCHAR(20)  UNIQUE NOT NULL,
    description    VARCHAR(255),
    is_active      BOOLEAN      DEFAULT TRUE,
    created_by     BIGINT,
    created_date   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    updated_by     BIGINT,
    updated_date   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);



INSERT INTO tracker.issue_type (type_name, type_code, description) VALUES
    ('Bug',         'BUG',         'Bug-related issues'),
    ('Issue',       'ISSUE',       'General issue category'),
    ('Feature',     'FEATURE',     'New feature request'),
    ('Enhancement', 'ENHANCEMENT', 'Improvements on existing features');



CREATE TABLE tracker.issue_status (
    id             BIGSERIAL PRIMARY KEY,
    status_name    VARCHAR(50)  NOT NULL,
    status_code    VARCHAR(20)  UNIQUE NOT NULL,
    description    VARCHAR(255),
    is_active      BOOLEAN      DEFAULT TRUE,
    created_by     BIGINT,
    created_date   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    updated_by     BIGINT,
    updated_date   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tracker.issue_status (status_name, status_code, description) VALUES
    ('Pending',      'PENDING',      'Waiting to be processed'),
    ('In Progress',  'IN_PROGRESS',  'Currently being worked on'),
    ('Completed',    'COMPLETED',    'Work finished successfully'),
    ('Rejected',     'REJECTED',     'Issue was rejected'),
    ('Resolved',     'RESOLVED',     'Issue has been resolved');

    INSERT INTO tracker.designation (name, code, description, is_active, created_by, created_date, updated_by, updated_date)
VALUES 
  ('Software Engineer', 'SE', 'Handles development tasks', true, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP),
  ('Senior Software Developer', 'SSD', 'Handles complex development tasks and mentorship', true, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP),
  ('Tester', 'QA', 'Performs software testing and QA', true, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP),
  ('UI/UX Designer', 'UIUX', 'Designs user interfaces and user experiences', true, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP);

  INSERT INTO tracker.designation (name, code, description, is_active, created_by, created_date, updated_by, updated_date)
VALUES 
  ('Business Analyst', 'BA', 'Analyzes business requirements and bridges the gap between business and tech teams', true, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP),
  ('Manager', 'MGR', 'Manages team operations and delivery', true, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP);