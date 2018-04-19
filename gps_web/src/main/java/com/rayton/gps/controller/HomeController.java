package com.rayton.gps.controller;

import com.rayton.gps.dao.overview.*;
import com.rayton.gps.dao.security.IdentityDto;
import com.rayton.gps.dao.security.MyInfo;
import com.rayton.gps.domain.security.SaveMyKeyRequest;
import com.rayton.gps.model.Login;
import com.rayton.gps.service.OverviewService;
import com.rayton.gps.service.SecurityService;
import com.rayton.gps.util.CookieUtil;
import com.rayton.gps.util.IP;
import com.rayton.gps.util.ResponseEntityWrapper;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
    @Autowired
    private SecurityService securityService;
    @Autowired
    private OverviewService overviewService;

    @GetMapping(value = "/")
    public String login(HttpServletRequest request, HttpServletResponse response) {
        clearCookies(request, response);
        // // System.out.println("1212");
        // model.addAttribute("login", new Login());
        return "login";
        // return "index";
    }


    @PostMapping(value = "/")
    public String login(@ModelAttribute("login") @Valid Login model, BindingResult binding, @CookieValue String
            verify) {
        if (binding.hasErrors()) {
            model.setVerify("");
            return "login";
        }

        try {
            // 检查验证码
            String code = model.getVerify();
            String var = CookieUtil.decoding(verify);
            // cookie 验证码匹配
            if (!code.equals(var)) {
                binding.addError(new ObjectError("", "验证码错误!"));
                model.setVerify("");
                return "login";
            }
            // cookie加token
            // Identity dto = securityService.login(model.getAccount(), model.getPwd());


            // clearCookies(request, response);
            // Cookie tokenCookie = new Cookie(CookieUtil.token, CookieUtil.makeToken(dto));
            // response.addCookie(tokenCookie);

            // 添加登录日志

            // List<OperateLog> logs = new ArrayList<OperateLog>(1);
            // OperateLog log = new OperateLog();
            // log.setAction("用户录登:" + request.getRemoteAddr());
            // log.setCompanyId(dto.getCompanyId());
            // log.setTime(new Date());
            // log.setUser(dto.getName());
            // log.setUserId(dto.getId());
            // logs.add(log);
            //
            // securityService.saveOperateLogs(logs);

        } catch (Exception ex) {
            String error = ex.getMessage();
            binding.addError(new ObjectError("", error));
            model.setVerify("");
            return "login";
        }


        // Shiro Test
        Subject subject = SecurityUtils.getSubject();
        if (!subject.isAuthenticated()) {
            // User jesusChrist = new User();
            // jesusChrist.setAccount(model.getAccount());
            // jesusChrist.setPassword(model.getPwd());
            // String jesus = MD5.doMD5(jesusChrist);
            UsernamePasswordToken token = new UsernamePasswordToken(model.getAccount(), model.getPwd());
            // 默认，懒得搞了
            // TODO
            token.setRememberMe(true);
            try {
                subject.login(token);
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                if (null != token) {
                    token.clear();
                }
            }
        }


        return "redirect:home";
    }

    @GetMapping(value = "/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        clearCookies(request, response);

        // Shiro Test
        Subject subject = SecurityUtils.getSubject();
        // Session session = subject.getSession();

        // isAuthenticated false 证明不是登录过的
        // isRemembered true 证明是没登陆直接通过记住我功能进来的

        if (subject.isAuthenticated() || subject.isRemembered()) {

            subject.logout();
        }

        return "redirect:/";
    }

    @GetMapping(value = "/home")
    public String index(Model model, HttpServletRequest request) throws Exception {


        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        // IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();

        CompanyServiceOverview companyServiceOverview = overviewService.companyServiceOverview(identity.getId());
        model.addAttribute("companyServiceOverview", companyServiceOverview);

        VehicleServiceOverview vehicleServiceOverview = overviewService.vehicleServiceOverview(identity.getId());
        model.addAttribute("vehicleServiceOverview", vehicleServiceOverview);

        VehicleMaintainOverview vehicleMaintainOverview = overviewService.vehicleMaintainOverview(identity.getId());
        model.addAttribute("vehicleMaintainOverview", vehicleMaintainOverview);

        VehicleCheckOverview vehicleCheckOverview = overviewService.vehicleCheckOverview(identity.getId());
        model.addAttribute("vehicleCheckOverview", vehicleCheckOverview);

        VehicleStatusOverview vehicleStatusOverview = overviewService.vehicleStatusOverview(identity.getId());
        model.addAttribute("vehicleStatusOverview", vehicleStatusOverview);

        // throw new Exception("mmp 异常出现了！");
        System.out.println(IP.get(request));
        // return "/home/index";
        return "index";

    }


    /*
     * 这是sb错误重定向的，呵呵，到时候删去，用全局异常
     *
     * */
    @RequestMapping("/result")
    @ResponseBody
    public Object result(@RequestParam int code, @RequestParam String error) {
        HashMap<String, Object> map = new HashMap<>();
        map.put("code", code);
        map.put("error", error);

        return map;
    }

    @GetMapping("/error")
    @ResponseBody
    public Object error(HttpServletRequest request) {
        return null;
        // Exception ex = (Exception) request.getAttribute("exception");
        // String message = ex.getMessage();
        // if (ex.getClass().equals(UndeclaredThrowableException.class)) {
        //     UndeclaredThrowableException e = (UndeclaredThrowableException) ex;
        //     message = e.getUndeclaredThrowable().getMessage();
        // }
        //
        // HashMap<String, Object> map = new HashMap<String, Object>();
        // map.put("code", 1);
        // map.put("error", message);
        //
        // return map;
    }

    @GetMapping(value = "/myinfo.form")
    public String myinfo(Model model, HttpServletRequest request) throws Exception {
        // Identity user = (Identity) request.getAttribute("user");
        IdentityDto user = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        MyInfo info = securityService.getMyInfo(user.getId());

        model.addAttribute("myinfo", info);

        return "/myinfo.form";
    }

    @PostMapping(value = "/myinfo.form")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> myinfo(@ModelAttribute("myinfo") @Valid MyInfo info, BindingResult
            binding) throws Exception {
        if (binding.hasErrors())
            return ResponseEntityWrapper.Failed();
        // return "/myinfo.form";
        securityService.saveMyinfo(info);
        return ResponseEntityWrapper.OK();
        // try {
        //     securityService.saveMyinfo(info);
        //     WebUtil.success(r);
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }

    @GetMapping(value = "/mykey.form")
    public String mykey(Model model) {
        model.addAttribute("mykey", new SaveMyKeyRequest());
        return "/mykey.form";
    }

    @PostMapping(value = "/mykey.form")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> mykey(@ModelAttribute("mykey") @Valid SaveMyKeyRequest mykey) throws
            Exception {
        IdentityDto user = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        // Identity user = (Identity) request.getAttribute("user");
        securityService.saveMyKey(user.getId(), mykey.getOldKey(), mykey.getNewKey(), mykey.getConfirmKey());

        return ResponseEntityWrapper.OK();
        // try {
        //     Identity user = (Identity) request.getAttribute("user");
        //     securityService.saveMyKey(user.getId(), mykey.getOldKey(), mykey.getNewKey(), mykey.getConfirmKey());
        //     WebUtil.success(r);
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }

    private void clearCookies(HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null)
            return;


        for (int i = 0, len = cookies.length; i < len; i++) {
            Cookie cookie = new Cookie(cookies[i].getName(), "");
            cookie.setMaxAge(0);
            response.addCookie(cookie);
        }
    }

    @GetMapping(value = "/memory.form")
    public String memory() {
        return "/memory.form";
    }

    @GetMapping(value = "/code.verify")
    public void verify(HttpServletResponse response) throws IOException {
        response.setContentType("image/jpeg");
        response.setHeader("Pragma", "No-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0);
        // 在内存中创建图象
        int width = 75, height = 32;
        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        // 获取图形上下文
        Graphics g = image.getGraphics();
        // 生成随机类
        Random random = new Random();
        // 设定背景色
        g.setColor(getRandColor(200, 250));
        g.fillRect(0, 0, width, height);
        // 设定字体
        g.setFont(new Font("Times New Roman", Font.PLAIN, 24));
        // 画边框
        g.setColor(getRandColor(160, 200));
        g.drawRect(0, 0, width - 1, height - 1);
        // 随机产生155条干扰线，使图象中的认证码不易被其它程序探测到
        g.setColor(getRandColor(160, 200));
        for (int i = 0; i < 155; i++) {
            int x = random.nextInt(width);
            int y = random.nextInt(height);
            int xl = random.nextInt(12);
            int yl = random.nextInt(12);
            g.drawLine(x, y, x + xl, y + yl);
        }
        // 取随机产生的认证码(4位数字)
        String sRand = "";
        for (int i = 0; i < 4; i++) {
            String rand = String.valueOf(random.nextInt(10));
            sRand += rand;
            // 将认证码显示到图象中
            g.setColor(new Color(20 + random.nextInt(110), 20 + random.nextInt(110), 20 + random.nextInt(110)));
            // 调用函数出来的颜色相同，可能是因为种子太接近，所以只能直接生成
            g.drawString(rand, 13 * i + 14, 20);
        }

        // 将认证码存入SESSION
        // exo me?
        response.addCookie(new Cookie("verify", CookieUtil.encoding(sRand)));
        // 图象生效
        g.dispose();
        // 输出图象到页面
        ImageIO.write(image, "JPEG", response.getOutputStream());
    }

    /* 该方法主要作用是获得随机生成的颜色 */
    private Color getRandColor(int s, int e) {
        Random random = new Random();
        if (s > 255)
            s = 255;
        if (e > 255)
            e = 255;
        int r, g, b;
        r = s + random.nextInt(e - s); // 随机生成RGB颜色中的r值
        g = s + random.nextInt(e - s); // 随机生成RGB颜色中的g值
        b = s + random.nextInt(e - s); // 随机生成RGB颜色中的b值
        return new Color(r, g, b);
    }
}
