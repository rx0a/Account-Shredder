package com.skilldistillery.sites.services;

import java.util.List;
import java.util.Optional;

import com.skilldistillery.sites.entities.Site;

public interface SiteService {

	Site FindById(int id);

	List<Site> allSites();

	List<Site> sitesByKeyword(String keyword);

	Site create(Site site);

	void delete(int id);

}
