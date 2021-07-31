package com.skilldistillery.sites.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.sites.entities.Site;
import com.skilldistillery.sites.respositories.SiteRepository;

@Service
public class SiteServiceImpl implements SiteService {
	@Autowired
	private SiteRepository repo;

	@Override
	public List<Site> allSites() {
		return repo.findAll();
	}

}
