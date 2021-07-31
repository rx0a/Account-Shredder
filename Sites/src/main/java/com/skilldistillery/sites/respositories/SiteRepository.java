package com.skilldistillery.sites.respositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.sites.entities.Site;

public interface SiteRepository extends JpaRepository<Site, Integer> {
	

}
