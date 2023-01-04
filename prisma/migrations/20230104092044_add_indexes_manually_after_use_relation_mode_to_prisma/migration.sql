-- CreateIndex
CREATE INDEX `mosque_qurban_event_mosque_id_idx` ON `mosque_qurban_event`(`mosque_id`);

-- CreateIndex
CREATE INDEX `mosque_qurban_event_qurban_event_id_idx` ON `mosque_qurban_event`(`qurban_event_id`);

-- CreateIndex
CREATE INDEX `mosque_user_mosque_id_idx` ON `mosque_user`(`mosque_id`);

-- CreateIndex
CREATE INDEX `mosque_user_user_id_idx` ON `mosque_user`(`user_id`);

-- CreateIndex
CREATE INDEX `qurban_event_citizen_user_id_idx` ON `qurban_event_citizen`(`user_id`);

-- CreateIndex
CREATE INDEX `qurban_event_citizen_qurban_event_id_idx` ON `qurban_event_citizen`(`qurban_event_id`);

-- CreateIndex
CREATE INDEX `qurban_event_committee_qurban_event_id_idx` ON `qurban_event_committee`(`qurban_event_id`);

-- CreateIndex
CREATE INDEX `qurban_event_committee_user_id_idx` ON `qurban_event_committee`(`user_id`);

-- CreateIndex
CREATE INDEX `qurban_event_committee_role_id_idx` ON `qurban_event_committee`(`role_id`);

-- CreateIndex
CREATE INDEX `qurban_registration_qurban_event_id_idx` ON `qurban_registration`(`qurban_event_id`);

-- CreateIndex
CREATE INDEX `qurban_registration_sacrificial_animal_id_idx` ON `qurban_registration`(`sacrificial_animal_id`);

-- CreateIndex
CREATE INDEX `qurban_registration_participant_qurban_registration_id_idx` ON `qurban_registration_participant`(`qurban_registration_id`);

-- CreateIndex
CREATE INDEX `qurban_registration_participant_user_id_idx` ON `qurban_registration_participant`(`user_id`);

-- CreateIndex
CREATE INDEX `qurban_registration_status_qurban_registration_id_idx` ON `qurban_registration_status`(`qurban_registration_id`);

-- CreateIndex
CREATE INDEX `user_role_user_id_idx` ON `user_role`(`user_id`);

-- CreateIndex
CREATE INDEX `user_role_role_id_idx` ON `user_role`(`role_id`);
