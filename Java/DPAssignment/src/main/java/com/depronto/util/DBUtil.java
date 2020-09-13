/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.depronto.util;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Saurabh.Choudhary
 */
public class DBUtil {

    public static Connection init(String fileName) {
        Connection con = null;
        try {
            System.out.println(System.getProperty("user.dir"));
            Properties prop = readPropertiesFile(fileName);
            String url = prop.getProperty("URL");
            String user = prop.getProperty("USER");
            String pass = prop.getProperty("PASS");
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            //best practice to use datsource, but its outside the scope of this assignment
            con = DriverManager.getConnection(url, user, pass);
        } catch (IOException ex) {
            Logger.getLogger(DBUtil.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(DBUtil.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(DBUtil.class.getName()).log(Level.SEVERE, null, ex);
        }
        return con;
    }

    public static Properties readPropertiesFile(String fileName) throws IOException {
        FileInputStream fis = null;
        Properties prop = null;
        try {
            fis = new FileInputStream(fileName);
            prop = new Properties();
            prop.load(fis);
        } catch (FileNotFoundException fnfe) {
            fnfe.printStackTrace();
        } catch (IOException ioe) {
            ioe.printStackTrace();
        } finally {
            fis.close();
        }
        return prop;
    }

    public static void syncNamesFromFile(String fileName, Connection con) {
        String[] split = null;
        if (!truncateTable(con)) {
            try {
                int count = 0;
                List<String> currentNames = FileUtil.readNames(fileName);
                String query = "INSERT INTO DP_USERNAME (SR,NAMES) VALUES (?,?)";
                PreparedStatement pstmt = con.prepareStatement(query);
                for (String names : currentNames) {
                    count++;
                    split = names.split("\\.+\\s+");
                    System.out.println("count = " + count + "split " + split[1]);
                    pstmt.setInt(1, count);
                    pstmt.setString(2, split[1]);
                    pstmt.addBatch();
                }
                pstmt.executeBatch();

            } catch (SQLException ex) {
                Logger.getLogger(DBUtil.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

    private static boolean truncateTable(Connection con) {
        boolean status = false;
        try {
            PreparedStatement pstmt = con.prepareStatement("TRUNCATE TABLE DP_USERNAME");
            status = pstmt.execute();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        System.out.println("status of truncate= " + status);
        return status;
    }

    static boolean create(Connection con, String username, String hashedPassword) {
        try {

            //code to handle already created user
            String query = "INSERT INTO DP_USERINFO (username,password) VALUES (?,?)";
            PreparedStatement pstmt = con.prepareStatement(query);
            pstmt.setString(1, username);
            pstmt.setString(2, hashedPassword);
            int rows = pstmt.executeUpdate();
            if (rows > 0) {
                return true;
            }
        } catch (SQLException ex) {
            Logger.getLogger(DBUtil.class.getName()).log(Level.SEVERE, null, ex);
        }
        return false;
    }

    static Map<String,String> validate(Connection con, String username, String hashedPassword) {
        Map<String,String> userMap = new HashMap<>();
        try {
//            String query = "SELECT 1 FROM DP_USERINFO WHERE username=? AND password= ?";
            String query = "select a.username, b.roleid from \n"
                    + "dp_userinfo a\n"
                    + "join dp_roles b \n"
                    + "on a.userid = b.userid\n"
                    + "and (a.username= ? and a.password = ?)";
            PreparedStatement pstmt = con.prepareStatement(query);
            pstmt.setString(1, username);
            pstmt.setString(2, hashedPassword);
            ResultSet result = pstmt.executeQuery();
            if (result.isBeforeFirst()) {
                if(result.next()){
                    userMap.put(result.getString("username"), result.getString("roleid"));
                }
            }
        } catch (SQLException ex) {
            Logger.getLogger(DBUtil.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return userMap;
    }
}
