package com.saurabh.springdemo.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.saurabh.springdemo.entity.Customer;

@Repository
public class CustomerDAOImpl implements CustomerDAO {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	@Override
	public List<Customer> getCustomers() {
		
		Session session = sessionFactory.getCurrentSession();
		
		Query<Customer> query = session.createQuery("from Customer order by lastName",Customer.class);
		
		List<Customer> customers = query.getResultList();
		return customers;
	}

	@Override
	public void saveCustomer(Customer theCustomer) {
		Session session = sessionFactory.getCurrentSession();
		session.saveOrUpdate(theCustomer);
		System.out.println("In CustomerDAOImpl customer saved");
		
	}

	@Override
	public Customer getCustomerById(int theId) {
		Session session = sessionFactory.getCurrentSession();
		Customer obtainedCustomer = session.get(Customer.class, theId);
		System.out.println("CustomerDAOImpl obtainedCustomer = " + obtainedCustomer);
		return obtainedCustomer;
	}

	@Override
	public void deleteCustomer(int custId) {
		Session session = sessionFactory.getCurrentSession();
		System.out.println("getting customer before delete for id " + custId);
		Customer theCustomer = session.get(Customer.class,custId);
		System.out.println("Customer obtained before deleete as " + theCustomer);
		session.delete(theCustomer);
	}

}
