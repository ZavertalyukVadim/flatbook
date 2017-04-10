CREATE TABLE IF NOT EXISTS `user_announcements` (
  `user_announcements_id` int(11) NOT NULL AUTO_INCREMENT,
  `announcement_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_announcements_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `users_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `pass` varchar(255) NOT NULL,
  `image_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `FK17herqt2to4hyl5q5r5ogbxk9` (`image_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `region` (
  `region_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`region_id`),
  KEY `FK7vb2cqcnkr9391hfn72louxkq` (`country_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=17 ;

CREATE TABLE IF NOT EXISTS `photo` (
  `photo_id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varbinary(1111) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`photo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;


CREATE TABLE IF NOT EXISTS `phones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `is_primary` bit(1) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKmg6d77tgqfen7n1g763nvsqe3` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `images` (
  `photo_id` int(11) NOT NULL AUTO_INCREMENT,
  `photo` mediumblob,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`photo_id`),
  KEY `FK13ljqfrfwbyvnsdhihwta8cpr` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `favorite_announcement_in_user` (
  `favorite_announcement_in_user_id` int(11) NOT NULL AUTO_INCREMENT,
  `announcement_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`favorite_announcement_in_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `emails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `is_primary` bit(1) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK41wb6kvdemvj1602iltrfr1uo` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `district` (
  `district_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`district_id`),
  KEY `FKsgx09prp6sk2f0we38bf2dtal` (`city_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

CREATE TABLE IF NOT EXISTS `country` (
  `country_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`country_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

CREATE TABLE IF NOT EXISTS `city` (
  `city_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `region_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`city_id`),
  KEY `FKsi0dkm9kk6dyuedmc0j18t770` (`region_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=33 ;

CREATE TABLE IF NOT EXISTS `announcements_photos` (
  `photo_id` int(11) NOT NULL,
  `announcement_id` int(11) NOT NULL,
  PRIMARY KEY (`announcement_id`),
  KEY `FKkcc82j077l4sc7w99rrderr04` (`photo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `announcements_amenities` (
  `announcement_id` int(11) NOT NULL,
  `amenity_id` int(11) NOT NULL,
  KEY `FKpx26imayxhd3whiabg072h7s2` (`amenity_id`),
  KEY `FKrf3cd15lsnj28yvcii1bffk5y` (`announcement_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `announcement` (
  `announcement_id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `house_number` varchar(255) DEFAULT NULL,
  `last_updated` datetime DEFAULT NULL,
  `living_places` int(11) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `price_per_day` int(11) DEFAULT NULL,
  `price_per_month` int(11) DEFAULT NULL,
  `rooms` int(11) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `visibility` bit(1) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `district_id` int(11) DEFAULT NULL,
  `region_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`announcement_id`),
  KEY `FK3b7qe8c6nelma9m3ftjuex1v3` (`city_id`),
  KEY `FK8fypk2b1251xi6kw7epf2v21n` (`country_id`),
  KEY `FKrt93bi6igteqwcrkha0aekky1` (`district_id`),
  KEY `FKraajmrefq9bukmm4gfr05ljs3` (`region_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=65 ;

CREATE TABLE IF NOT EXISTS `amenity` (
  `amenity_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`amenity_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;












