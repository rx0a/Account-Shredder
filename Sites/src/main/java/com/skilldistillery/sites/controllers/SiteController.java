package com.skilldistillery.sites.controllers;

import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.sites.entities.Site;
import com.skilldistillery.sites.services.SiteService;
import com.skilldistillery.sites.upload.UploadSites;
@CrossOrigin({ "*", "http://localhost:4210" })
@RequestMapping("api")
@RestController
public class SiteController {

	@Autowired
	private SiteService svc;

	@GetMapping("sites")
	public List<Site> listSites() {
		return svc.allSites();
	}

	@GetMapping("sites/search/{keyword}")
	public List<Site> siteByKeyword(@PathVariable String keyword, HttpServletResponse res) {
		List<Site> sites = svc.sitesByKeyword(keyword);
		System.out.println(sites);
		if (sites.isEmpty()) {
			res.setStatus(404);
		}
		return sites;
	}

	@PostMapping("sites")
	public Site create(@RequestBody Site site, HttpServletRequest req, HttpServletResponse res) {
		try {
			site = svc.create(site);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(site.getId());
			res.setHeader("Location", url.toString());
		} catch (Exception e) {
			res.setStatus(400);
			site = null;
		}
		return site;
	}

	@PutMapping("sites")
	public Site update(@RequestBody Site site, HttpServletRequest req, HttpServletResponse res) {
		try {
			site = svc.create(site);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(site.getId());
			res.setHeader("Location", url.toString());
		} catch (Exception e) {
			res.setStatus(400);
			site = null;
		}
		return site;
	}

	@DeleteMapping("sites/{id}")
	public void delete(@PathVariable int id, HttpServletResponse res) {
		try {
			svc.delete(id);
			res.setStatus(200);
		} catch (Exception e) {
			res.setStatus(409);
		}
	}

	@PostMapping("upload")
	public List<UploadSites> uploadSites(@RequestBody List<UploadSites> uploadSites) {
		saveUploads(uploadSites);
		return uploadSites;
	}

	private void saveUploads(List<UploadSites> uploadSites) {
		String fileName = "../DB/sites.csv";
		String domains = "../DB/domains.csv";
		try {
			PrintWriter domainWriter = new PrintWriter(domains);
			PrintWriter siteWriter = new PrintWriter(fileName);
			int siteId = 1;
			int domainId = 1;
			for (UploadSites s : uploadSites) {
				siteWriter.print(siteId + "," + s.getName() + "," + s.getUrl() + "," + s.getDifficulty() + ",\""
						+ s.getNotes().replaceAll("\"", "\"\"") + "\",\"");
				siteWriter.print(s.getNotes_cat().replaceAll("\"", "\"\"") + "\",\""
						+ s.getNotes_es().replaceAll("\"", "\"\"") + "\",\"" + s.getNotes_fr().replaceAll("\"", "\"\"")
						+ "\",\"" + s.getNotes_it().replaceAll("\"", "\"\"") + "\",\"");
				siteWriter.print(
						s.getNotes_pl().replaceAll("\"", "\"\"") + "\",\"" + s.getNotes_pt_br().replaceAll("\"", "\"\"")
								+ "\",\"" + s.getNotes_ru().replaceAll("\"", "\"\"") + "\",\""
								+ s.getNotes_tr().replaceAll("\"", "\"\"") + "\",");
				siteWriter.print(s.getEmail() + ",\"" + s.getEmail_subject().replaceAll("\"", "\"\"") + "\",\""
						+ s.getEmail_body().replaceAll("\"", "\"\"") + "\"");
				siteWriter.println();
				for (String d : s.getDomains()) {
					domainWriter.println(domainId++ + "," + siteId + "," + d);
				}
				siteId++;
			}
			siteWriter.close();
			domainWriter.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}
}
