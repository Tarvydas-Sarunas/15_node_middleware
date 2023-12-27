-- sukurti lentele
-- username, password, timestamp

-- sukurti 3 irasus

CREATE TABLE users
(
  user_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id)
) ENGINE = InnoDB;