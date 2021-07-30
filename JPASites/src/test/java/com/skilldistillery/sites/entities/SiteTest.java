package com.skilldistillery.sites.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class SiteTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Site site;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("JPASites");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		site = em.find(Site.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		site = null;
	}

	@Test
	void test() {
		assertNotNull(site);
		assertEquals("twitter", site.getName());
	}

}
