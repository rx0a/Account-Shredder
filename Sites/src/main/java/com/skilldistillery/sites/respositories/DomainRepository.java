package com.skilldistillery.sites.respositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.sites.entities.Domain;

public interface DomainRepository extends JpaRepository<Domain, Integer> {

}
