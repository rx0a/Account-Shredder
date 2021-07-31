package com.skilldistillery.sites.controllers;


import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.sites.entities.Site;
import com.skilldistillery.sites.services.SiteService;
import com.skilldistillery.sites.upload.UploadSites;

@RequestMapping("api")
@RestController
public class SiteController {

	@Autowired
	private SiteService svc;
	
	@GetMapping("sites")
	public List<Site> listSites() {
		return svc.allSites();
	}
	
	@PostMapping("upload")
	public List<UploadSites> uploadSites(@RequestBody List<UploadSites> uploadSites){
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
			siteWriter.print(siteId + "," + s.getName() + "," +s.getUrl() + "," +s.getDifficulty() + ",\"" +s.getNotes().replaceAll("\"","\"\"")+ "\",\"" );
			siteWriter.print(s.getNotes_cat().replaceAll("\"","\"\"") + "\",\"" + s.getNotes_es().replaceAll("\"","\"\"") + "\",\"" +s.getNotes_fr().replaceAll("\"","\"\"") + "\",\"" +s.getNotes_it().replaceAll("\"","\"\"") + "\",\"");
			siteWriter.print(s.getNotes_pl().replaceAll("\"","\"\"") + "\",\"" +s.getNotes_pt_br().replaceAll("\"","\"\"") + "\",\"" +s.getNotes_ru().replaceAll("\"","\"\"") + "\",\"" +s.getNotes_tr().replaceAll("\"","\"\"") + "\",");
			siteWriter.print(s.getEmail() + ",\"" +s.getEmail_subject().replaceAll("\"","\"\"") + "\",\"" +s.getEmail_body().replaceAll("\"","\"\"") + "\"");
			siteWriter.println();
			for (String d : s.getDomains() ) {
				domainWriter.println(domainId++  + "," + siteId + "," + d);
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
