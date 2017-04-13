ALTER TABLE `heroku_402365f31dab0c6`.`emails`
  ADD CONSTRAINT `fk_emails_user` FOREIGN KEY (`user_id`) REFERENCES `heroku_402365f31dab0c6`.`users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `heroku_402365f31dab0c6`.`phones`
  ADD CONSTRAINT `fk_phones_user` FOREIGN KEY (`user_id`) REFERENCES `heroku_402365f31dab0c6`.`users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `heroku_402365f31dab0c6`.`images`
  ADD CONSTRAINT `fk_images_user` FOREIGN KEY (`user_id`) REFERENCES `heroku_402365f31dab0c6`.`users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;



ALTER TABLE `heroku_402365f31dab0c6`.`announcements`
  ADD CONSTRAINT `fk_announcements_user` FOREIGN KEY (`user_id`) REFERENCES `heroku_402365f31dab0c6`.`users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `heroku_402365f31dab0c6`.`announcements`
  ADD CONSTRAINT `fk_announcements_region` FOREIGN KEY (`region_id`) REFERENCES `heroku_402365f31dab0c6`.`regions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `heroku_402365f31dab0c6`.`announcements`
  ADD CONSTRAINT `fk_announcements_district` FOREIGN KEY (`district_id`) REFERENCES `heroku_402365f31dab0c6`.`districts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `heroku_402365f31dab0c6`.`announcements`
  ADD CONSTRAINT `fk_announcements_city` FOREIGN KEY (`city_id`) REFERENCES `heroku_402365f31dab0c6`.`cities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `heroku_402365f31dab0c6`.`announcements`
  ADD CONSTRAINT `fk_announcements_country` FOREIGN KEY (`country_id`) REFERENCES `heroku_402365f31dab0c6`.`countries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;



ALTER TABLE `heroku_402365f31dab0c6`.`announcements_amenities`
  ADD CONSTRAINT `fk_announcements_amenities_announcement` FOREIGN KEY (`announcement_id`) REFERENCES `heroku_402365f31dab0c6`.`announcements` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_announcements_amenities_amenity` FOREIGN KEY (`amenity_id`) REFERENCES `heroku_402365f31dab0c6`.`amenities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;



ALTER TABLE `heroku_402365f31dab0c6`.`announcements_comments`
  ADD CONSTRAINT `fk_announcements_comments_user` FOREIGN KEY (`user_id`) REFERENCES `heroku_402365f31dab0c6`.`users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_announcements_comments_announcement` FOREIGN KEY (`announcement_id`) REFERENCES `heroku_402365f31dab0c6`.`announcements` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `heroku_402365f31dab0c6`.`announcements_photos`
  ADD CONSTRAINT `fk_announcements_photos_announcement` FOREIGN KEY (`announcement_id`) REFERENCES `heroku_402365f31dab0c6`.`announcements` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_announcements_photos_photo` FOREIGN KEY (`photo_id`) REFERENCES `heroku_402365f31dab0c6`.`photos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE `heroku_402365f31dab0c6`.`cities`
  ADD CONSTRAINT `fk_cities_region` FOREIGN KEY (`region_id`) REFERENCES `heroku_402365f31dab0c6`.`regions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `heroku_402365f31dab0c6`.`districts`
  ADD CONSTRAINT `fk_districts_city` FOREIGN KEY (`city_id`) REFERENCES `heroku_402365f31dab0c6`.`cities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;



ALTER TABLE `heroku_402365f31dab0c6`.`favorites_announcements_in_user`
  ADD CONSTRAINT `fk_favorites_announcements_in_user_user` FOREIGN KEY (`user_id`) REFERENCES `heroku_402365f31dab0c6`.`users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_favorites_announcements_in_user_announcement` FOREIGN KEY (`announcement_id`) REFERENCES `heroku_402365f31dab0c6`.`announcements` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `heroku_402365f31dab0c6`.`regions`
  ADD CONSTRAINT `fk_regions_country` FOREIGN KEY (`country_id`) REFERENCES `heroku_402365f31dab0c6`.`countries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;



ALTER TABLE `heroku_402365f31dab0c6`.`users_announcements`
  ADD CONSTRAINT `fk_users_announcements_user` FOREIGN KEY (`user_id`) REFERENCES `heroku_402365f31dab0c6`.`users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_users_announcements_announcement` FOREIGN KEY (`announcement_id`) REFERENCES `heroku_402365f31dab0c6`.`announcements` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
