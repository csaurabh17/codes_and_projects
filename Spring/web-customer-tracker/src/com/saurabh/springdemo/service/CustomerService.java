package com.saurabh.springdemo.service;

import java.util.List;

import com.saurabh.springdemo.entity.Customer;

public interface CustomerService {

	public List<Customer> getCustomers();

	public void saveCustomer(Customer theCustomer);

	public Customer getCustomerById(int theId);

	public void deleteCustomer(int custId);
}
